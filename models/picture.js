'use strict'

module.exports = (sequelize, DataTypes) => {  
  const Picture = sequelize.define('Picture', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    url: {
      type: DataTypes.STRING,
      required: true
    },
    alt: {
        type: DataTypes.STRING,
        required: true
    }
  });

  return Picture;
};