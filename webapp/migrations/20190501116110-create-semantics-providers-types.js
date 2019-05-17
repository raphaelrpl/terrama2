module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('semantics_providers_types', {
      data_provider_type_id: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: {
            tableName: 'data_provider_types',
            schema: 'terrama2'
          },
          allowNull: false
        },
        onDelete: 'CASCADE'
      },
      data_series_semantics_id: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: {
            tableName: 'data_series_semantics',
            schema: 'terrama2'
          }
        },
        onDelete: 'CASCADE'
      },
    }, { schema: 'terrama2' });
  },
  down: function(queryInterface, /*Sequelize*/) {
    return queryInterface.dropTable({ tableName: 'semantics_providers_types', schema: 'terrama2' });
  }
};