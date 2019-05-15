module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('data_series_semantics', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      data_format_name: {
        type: Sequelize.STRING,
        references: {
          model: 'data_formats',
          key: 'name'
        }
      },
      data_series_type_name: {
        type: Sequelize.STRING,
        references: {
          model: 'data_series_types',
          key: 'name'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('data_series_semantics');
  }
};