"use strict";

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("crons", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      chat_id: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable("crons");
  },
};
