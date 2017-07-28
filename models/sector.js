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
    },
    location: {
        type: Sequelize.GEOMETRY('POINT'),
        allowNull: false
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