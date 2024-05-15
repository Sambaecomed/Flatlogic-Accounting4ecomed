const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const accounts = sequelize.define(
    'accounts',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      code: {
        type: DataTypes.TEXT,
      },

      name: {
        type: DataTypes.TEXT,
      },

      type: {
        type: DataTypes.ENUM,

        values: ['asset', 'liability', 'equity', 'revenue', 'expense'],
      },

      description: {
        type: DataTypes.TEXT,
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

  accounts.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.accounts.hasMany(db.transactions, {
      as: 'transactions_account',
      foreignKey: {
        name: 'accountId',
      },
      constraints: false,
    });

    //end loop

    db.accounts.belongsTo(db.accounts, {
      as: 'parent_account',
      foreignKey: {
        name: 'parent_accountId',
      },
      constraints: false,
    });

    db.accounts.belongsTo(db.organizations, {
      as: 'organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.accounts.belongsTo(db.accountgroup, {
      as: 'account_group',
      foreignKey: {
        name: 'account_groupId',
      },
      constraints: false,
    });

    db.accounts.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.accounts.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return accounts;
};
