const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class AccountsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const accounts = await db.accounts.create(
      {
        id: data.id || undefined,

        code: data.code || null,
        name: data.name || null,
        type: data.type || null,
        description: data.description || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await accounts.setParent_account(data.parent_account || null, {
      transaction,
    });

    await accounts.setOrganization(data.organization || null, {
      transaction,
    });

    await accounts.setAccount_group(data.account_group || null, {
      transaction,
    });

    return accounts;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const accountsData = data.map((item, index) => ({
      id: item.id || undefined,

      code: item.code || null,
      name: item.name || null,
      type: item.type || null,
      description: item.description || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const accounts = await db.accounts.bulkCreate(accountsData, {
      transaction,
    });

    // For each item created, replace relation files

    return accounts;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const accounts = await db.accounts.findByPk(id, {}, { transaction });

    await accounts.update(
      {
        code: data.code || null,
        name: data.name || null,
        type: data.type || null,
        description: data.description || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await accounts.setParent_account(data.parent_account || null, {
      transaction,
    });

    await accounts.setOrganization(data.organization || null, {
      transaction,
    });

    await accounts.setAccount_group(data.account_group || null, {
      transaction,
    });

    return accounts;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const accounts = await db.accounts.findByPk(id, options);

    await accounts.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await accounts.destroy({
      transaction,
    });

    return accounts;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const accounts = await db.accounts.findOne({ where }, { transaction });

    if (!accounts) {
      return accounts;
    }

    const output = accounts.get({ plain: true });

    output.transactions_account = await accounts.getTransactions_account({
      transaction,
    });

    output.parent_account = await accounts.getParent_account({
      transaction,
    });

    output.organization = await accounts.getOrganization({
      transaction,
    });

    output.account_group = await accounts.getAccount_group({
      transaction,
    });

    return output;
  }

  static async findAll(filter, options) {
    var limit = filter.limit || 0;
    var offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.accounts,
        as: 'parent_account',
      },

      {
        model: db.organizations,
        as: 'organization',
      },

      {
        model: db.accountgroup,
        as: 'account_group',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.code) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('accounts', 'code', filter.code),
        };
      }

      if (filter.name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('accounts', 'name', filter.name),
        };
      }

      if (filter.description) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('accounts', 'description', filter.description),
        };
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.type) {
        where = {
          ...where,
          type: filter.type,
        };
      }

      if (filter.parent_account) {
        var listItems = filter.parent_account.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          parent_accountId: { [Op.or]: listItems },
        };
      }

      if (filter.organization) {
        var listItems = filter.organization.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          organizationId: { [Op.or]: listItems },
        };
      }

      if (filter.account_group) {
        var listItems = filter.account_group.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          account_groupId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.accounts.count({
            where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.accounts.findAndCountAll({
          where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('accounts', 'name', query),
        ],
      };
    }

    const records = await db.accounts.findAll({
      attributes: ['id', 'name'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.name,
    }));
  }
};
