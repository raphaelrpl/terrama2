module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`CREATE SCHEMA IF NOT EXISTS terrama2`)
  },
  down: function(queryInterface, /*Sequelize*/) {
    return queryInterface.sequelize.query(`DROP SCHEMA IF EXISTS terrama2`)
  }
};