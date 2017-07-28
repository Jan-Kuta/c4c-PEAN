'use strict'

module.exports = (sequelize, DataTypes) => {  
  const Area = sequelize.define('Area', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    areaname: {
      type: DataTypes.STRING,
      required: true
    }
  });

  Area.associate = function(models){
    Area.belongsTo(models.Country, {
      foreignKey: {
        allowNull: false
      }
    });

    Area.hasMany(models.Sector);
  }

  return Area;
};