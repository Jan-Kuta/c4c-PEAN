'use strict'

module.exports = (sequelize, DataTypes) => {  
  const Sector = sequelize.define('Sector', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    sectorname: {
      type: DataTypes.STRING,
      required: true
    }
  });

  Sector.associate = function(models){
    Sector.belongsTo(models.Area, {
      foreignKey: {
        allowNull: false
      }
    });

    Sector.hasMany(models.Rock);
  }

  return Sector;
};