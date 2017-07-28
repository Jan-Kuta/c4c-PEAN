'use strict'

module.exports = (sequelize, DataTypes) => {  
  const Route = sequelize.define('Route', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    routename: {
      type: DataTypes.STRING,
      required: true
    }
  });

  Route.associate = function(models){
    Route.belongsTo(models.Rock, {
      foreignKey: {
        allowNull: false
      }
    });

    Route.hasMany(models.Attribute);
  }

  return Route;
};