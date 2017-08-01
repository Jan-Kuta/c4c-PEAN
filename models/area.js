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
    },
    location: {
        type: DataTypes.GEOMETRY('POINT'),
        allowNull: false
    }
  },
  {
    paranoid: true
  });

  Area.associate = function(models){
    Area.belongsTo(models.Country, {
      foreignKey: {
        allowNull: false
      }
    });

    Area.hasMany(models.Sector);
  }

  Area.getByLocation = function(lngLeftUp, latLeftUp, lngRightDown, latRightDown){
    // get all areas in the rectangle
    return sequelize.query("select * from \"Areas\" where ST_Contains(ST_GeomFromText('POLYGON((:lngLeftUp :latLeftUp, :lngRightDown :latLeftUp, :lngRightDown :latRightDown, :lngLeftUp :latRightDown, :lngLeftUp :latLeftUp))'), location)",{
      replacements: { 
        lngLeftUp: Number(lngLeftUp),
        latLeftUp: Number(latLeftUp), 
        lngRightDown: Number(lngRightDown),
        latRightDown: Number(latRightDown)
      }, type: sequelize.QueryTypes.SELECT});
  }

  return Area;
};