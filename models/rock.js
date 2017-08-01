'use strict'

module.exports = (sequelize, DataTypes) => {  
  const Rock = sequelize.define('Rock', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    rockname: {
      type: DataTypes.STRING,
      required: true
    },
    location: {
        type: DataTypes.GEOMETRY('POINT')
    }
  },
  {
    paranoid: true
  });

  Rock.associate = function(models){
    Rock.belongsTo(models.Sector, {
      foreignKey: {
        allowNull: false
      }
    });

    Rock.hasMany(models.Route);
  }

  return Rock;
};