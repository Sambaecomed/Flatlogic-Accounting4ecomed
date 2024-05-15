const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const parties_in_transactions = sequelize.define(
    'parties_in_transactions',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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

  parties_in_transactions.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.parties_in_transactions.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.parties_in_transactions.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return parties_in_transactions;
};
