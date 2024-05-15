const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const reference_transaction_types = sequelize.define(
    'reference_transaction_types',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      description: {
        type: DataTypes.TEXT,
      },

      type: {
        type: DataTypes.ENUM,

        values: [
          'Transaction Type 1',

          'Transaction Type 2',

          'Transaction Type 3',
        ],
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

  reference_transaction_types.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.reference_transaction_types.hasMany(db.transactions, {
      as: 'transactions_transaction_category',
      foreignKey: {
        name: 'transaction_categoryId',
      },
      constraints: false,
    });

    //end loop

    db.reference_transaction_types.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.reference_transaction_types.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return reference_transaction_types;
};
