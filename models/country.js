'use strict'

module.exports = (sequelize, DataTypes) => {  
  const Country = sequelize.define('Country', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    countryname: {
      type: DataTypes.STRING,
      required: true
    }
  });

  Country.associate = function(models){
    Country.hasMany(models.Area);
  }

  return Country;
};