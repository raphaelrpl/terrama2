module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('data_series_types', {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      description: Sequelize.STRING
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('data_series_types');
  }
};