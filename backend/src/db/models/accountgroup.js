const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const accountgroup = sequelize.define(
    'accountgroup',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
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

  accountgroup.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.accountgroup.hasMany(db.accounts, {
      as: 'accounts_account_group',
      foreignKey: {
        name: 'account_groupId',
      },
      constraints: false,
    });

    //end loop

    db.accountgroup.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.accountgroup.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return accountgroup;
};
