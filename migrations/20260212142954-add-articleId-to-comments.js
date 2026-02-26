'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Comments', 'articleId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Articles',
        key: 'id'
      },
      onDelete: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Comments', 'articleId');
  }
};
