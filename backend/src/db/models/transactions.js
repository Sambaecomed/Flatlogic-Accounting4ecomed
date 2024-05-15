const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const transactions = sequelize.define(
    'transactions',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      date: {
        type: DataTypes.DATE,
      },

      description: {
        type: DataTypes.TEXT,
      },

      amount: {
        type: DataTypes.DECIMAL,
      },

      type: {
        type: DataTypes.ENUM,

        values: ['debit', 'credit'],
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  transactions.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.transactions.belongsTo(db.accounts, {
      as: 'account',
      foreignKey: {
        name: 'accountId',
      },
      constraints: false,
    });

    db.transactions.belongsTo(db.organizations, {
      as: 'organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.transactions.belongsTo(db.reference_transaction_types, {
      as: 'transaction_category',
      foreignKey: {
        name: 'transaction_categoryId',
      },
      constraints: false,
    });

    db.transactions.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.transactions.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return transactions;
};
