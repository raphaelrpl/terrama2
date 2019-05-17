module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('analysis_data_series', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      alias: Sequelize.STRING,
      data_series_id: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: {
            tableName: 'data_series',
            schema: "terrama2"
          },
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      type_id: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: {
            tableName: 'analysis_data_series_types',
            schema: "terrama2"
          },
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      analysis_id: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: {
            tableName: 'analysis',
            schema: "terrama2"
          },
        },
        allowNull: false,
        onDelete: 'CASCADE'
      }
    }, { schema: 'terrama2' });
  },
  down: function(queryInterface, /*Sequelize*/) {
    return queryInterface.dropTable({ tableName: 'analysis_data_series', schema: 'terrama2' });
  }
};