module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('analysis_output_grids', {
      interpolation_dummy: {
        type: Sequelize.NUMERIC
      },
      resolution_x: {
        type: Sequelize.NUMERIC
      },
      resolution_y: {
        type: Sequelize.NUMERIC
      },
      srid: {
        type: Sequelize.INTEGER
      },
      area_of_interest_box: {
        type: Sequelize.GEOMETRY("Polygon")
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
      },
      resolution_type: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: {
            tableName: 'analysis_resolution_types',
            schema: "terrama2"
          },
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      interpolation_method: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: {
            tableName: 'interpolation_methods',
            schema: "terrama2"
          },
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      area_of_interest_type: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: {
            tableName: 'area_of_interest_types',
            schema: "terrama2"
          },
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      resolution_data_series_id: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: {
            tableName: 'data_series',
            schema: "terrama2"
          },
        },
        allowNull: true,
        onDelete: 'CASCADE'
      },
      area_of_interest_data_series_id: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: {
            tableName: 'data_series',
            schema: "terrama2"
          },
        },
        allowNull: true,
        onDelete: 'CASCADE'
      }
    }, { schema: 'terrama2' });
  },
  down: function(queryInterface, /*Sequelize*/) {
    return queryInterface.dropTable({ tableName: 'analysis_output_grids', schema: 'terrama2' });
  }
};