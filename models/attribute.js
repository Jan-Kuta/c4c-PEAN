'use strict'

module.exports = (sequelize, DataTypes) => {  
  const Attribute = sequelize.define('Attribute', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    attributename: {
      type: DataTypes.STRING,
      required: true
    },
    attributePicture: {
        type: DataTypes.STRING,
        required: true
    }
    // multilingual description TODO
  },
  {
    paranoid: true
  });

  return Attribute;
};