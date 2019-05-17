module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('analysis', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: Sequelize.TEXT,
      script: Sequelize.TEXT,
      active: Sequelize.BOOLEAN,
      schedule_type: Sequelize.INTEGER,
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
      instance_id: {
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
      type_id: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: {
            tableName: 'analysis_types',
            schema: "terrama2"
          },
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      dataset_output: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: {
            tableName: 'data_sets',
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
      automatic_schedule_id: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: {
            tableName: 'automatic_schedules',
            schema: "terrama2"
          },
        },
        allowNull: true,
        onDelete: 'CASCADE'
      },
      script_language_id: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: {
            tableName: 'script_languages',
            schema: "terrama2"
          },
        },
        allowNull: false,
        onDelete: 'CASCADE'
      }
    }, { schema: 'terrama2' });
  },
  down: function(queryInterface, /*Sequelize*/) {
    return queryInterface.dropTable({ tableName: 'analysis', schema: 'terrama2' });
  }
};