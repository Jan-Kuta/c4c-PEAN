"use strict";
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    hash: DataTypes.TEXT,
    salt: DataTypes.TEXT
  });

  // setter for password storing - hash and salt stored instead
  User.prototype.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
  };

  // validate the password according to the hash
  User.prototype.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
    return this.hash === hash;
  };

  // generates Json Web Token for the user
  User.prototype.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        //_id: this._id,
        email: this.email,
        username: this.username,
        exp: parseInt(expiry.getTime() / 1000),
    }, process.env.JWT_SECRET);
  };

  return User;
}; 
