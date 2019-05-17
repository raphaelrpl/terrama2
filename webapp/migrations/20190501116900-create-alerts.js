module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('alerts', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      active: Sequelize.BOOLEAN,
      name: Sequelize.STRING,
      description: Sequelize.TEXT,
      legend_attribute: Sequelize.STRING,
      schedule_type: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      project_id: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: {
            tableName: 'projects',
            schema: "terrama2"
          },
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
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
      service_instance_id: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: {
            tableName: 'service_instances',
            schema: "terrama2"
          },
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      schedule_id: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: {
            tableName: 'schedules',
            schema: "terrama2"
          },
        },
        allowNull: true,
        onDelete: 'CASCADE'
      },
      legend_id: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: {
            tableName: 'legends',
            schema: "terrama2"
          },
        },
        allowNull: false,
        onDelete: 'NO ACTION'
      },
      view_id: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: {
            tableName: 'views',
            schema: "terrama2"
          },
        },
        allowNull: false,
        onDelete: 'CASCADE'
      }
    }, { schema: 'terrama2' });
  },
  down: function(queryInterface, /*Sequelize*/) {
    return queryInterface.dropTable({ tableName: 'alerts', schema: 'terrama2' });
  }
};