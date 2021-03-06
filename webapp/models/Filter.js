module.exports = function(sequelize, DataTypes) {
  var Filter = sequelize.define("Filter",
    {
      frequency: DataTypes.INTEGER,
      frequency_unit: DataTypes.STRING,
      discard_before: DataTypes.DATE,
      discard_after: DataTypes.DATE,
      region: DataTypes.GEOMETRY('POLYGON'),
      by_value: DataTypes.DECIMAL,
      crop_raster: DataTypes.BOOLEAN,
      data_series_id: DataTypes.INTEGER
    },
    {
      underscored: true,
      underscoredAll: true,
      timestamps: false,

      classMethods: {
        associate: function(models) {
          Filter.belongsTo(models.Collector, {
            foreignKey: {
              allowNull: false,
              unique: true
            }
          });

          Filter.belongsTo(models.DataSeries, {
            onDelete: "NO ACTION",
            foreignKey: {
              name: "data_series_id",
              allowNull: true
            }
          });

          Filter.hasMany(models.ValueComparisonOperation, {
            onDelete: "CASCADE",
            foreignKey: {
              name: 'value_comparison_operation',
              allowNull: false
            }
          })
        }
      }
    }
  );

  return Filter;
};
