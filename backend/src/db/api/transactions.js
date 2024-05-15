const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class TransactionsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const transactions = await db.transactions.create(
      {
        id: data.id || undefined,

        date: data.date || null,
        description: data.description || null,
        amount: data.amount || null,
        type: data.type || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await transactions.setAccount(data.account || null, {
      transaction,
    });

    await transactions.setOrganization(data.organization || null, {
      transaction,
    });

    await transactions.setTransaction_category(
      data.transaction_category || null,
      {
        transaction,
      },
    );

    return transactions;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const transactionsData = data.map((item, index) => ({
      id: item.id || undefined,

      date: item.date || null,
      description: item.description || null,
      amount: item.amount || null,
      type: item.type || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const transactions = await db.transactions.bulkCreate(transactionsData, {
      transaction,
    });

    // For each item created, replace relation files

    return transactions;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const transactions = await db.transactions.findByPk(
      id,
      {},
      { transaction },
    );

    await transactions.update(
      {
        date: data.date || null,
        description: data.description || null,
        amount: data.amount || null,
        type: data.type || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await transactions.setAccount(data.account || null, {
      transaction,
    });

    await transactions.setOrganization(data.organization || null, {
      transaction,
    });

    await transactions.setTransaction_category(
      data.transaction_category || null,
      {
        transaction,
      },
    );

    return transactions;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const transactions = await db.transactions.findByPk(id, options);

    await transactions.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await transactions.destroy({
      transaction,
    });

    return transactions;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const transactions = await db.transactions.findOne(
      { where },
      { transaction },
    );

    if (!transactions) {
      return transactions;
    }

    const output = transactions.get({ plain: true });

    output.account = await transactions.getAccount({
      transaction,
    });

    output.organization = await transactions.getOrganization({
      transaction,
    });

    output.transaction_category = await transactions.getTransaction_category({
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
        as: 'account',
      },

      {
        model: db.organizations,
        as: 'organization',
      },

      {
        model: db.reference_transaction_types,
        as: 'transaction_category',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.description) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'transactions',
            'description',
            filter.description,
          ),
        };
      }

      if (filter.dateRange) {
        const [start, end] = filter.dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            date: {
              ...where.date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            date: {
              ...where.date,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.amountRange) {
        const [start, end] = filter.amountRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            amount: {
              ...where.amount,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            amount: {
              ...where.amount,
              [Op.lte]: end,
            },
          };
        }
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

      if (filter.account) {
        var listItems = filter.account.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          accountId: { [Op.or]: listItems },
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

      if (filter.transaction_category) {
        var listItems = filter.transaction_category.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          transaction_categoryId: { [Op.or]: listItems },
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
          count: await db.transactions.count({
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
      : await db.transactions.findAndCountAll({
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
          Utils.ilike('transactions', 'description', query),
        ],
      };
    }

    const records = await db.transactions.findAll({
      attributes: ['id', 'description'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['description', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.description,
    }));
  }
};
