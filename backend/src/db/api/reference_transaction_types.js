const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Reference_transaction_typesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const reference_transaction_types =
      await db.reference_transaction_types.create(
        {
          id: data.id || undefined,

          description: data.description || null,
          type: data.type || null,
          importHash: data.importHash || null,
          createdById: currentUser.id,
          updatedById: currentUser.id,
        },
        { transaction },
      );

    return reference_transaction_types;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const reference_transaction_typesData = data.map((item, index) => ({
      id: item.id || undefined,

      description: item.description || null,
      type: item.type || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const reference_transaction_types =
      await db.reference_transaction_types.bulkCreate(
        reference_transaction_typesData,
        { transaction },
      );

    // For each item created, replace relation files

    return reference_transaction_types;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const reference_transaction_types =
      await db.reference_transaction_types.findByPk(id, {}, { transaction });

    await reference_transaction_types.update(
      {
        description: data.description || null,
        type: data.type || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return reference_transaction_types;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const reference_transaction_types =
      await db.reference_transaction_types.findByPk(id, options);

    await reference_transaction_types.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await reference_transaction_types.destroy({
      transaction,
    });

    return reference_transaction_types;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const reference_transaction_types =
      await db.reference_transaction_types.findOne({ where }, { transaction });

    if (!reference_transaction_types) {
      return reference_transaction_types;
    }

    const output = reference_transaction_types.get({ plain: true });

    output.transactions_transaction_category =
      await reference_transaction_types.getTransactions_transaction_category({
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
    let include = [];

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
            'reference_transaction_types',
            'description',
            filter.description,
          ),
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
          count: await db.reference_transaction_types.count({
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
      : await db.reference_transaction_types.findAndCountAll({
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
          Utils.ilike('reference_transaction_types', 'id', query),
        ],
      };
    }

    const records = await db.reference_transaction_types.findAll({
      attributes: ['id', 'id'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['id', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.id,
    }));
  }
};
