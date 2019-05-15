module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('data_formats', {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      description: Sequelize.STRING
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('data_formats');
  }
};