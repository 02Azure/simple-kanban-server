'use strict';
const hashPassword = require("../helpers/password-hasher")

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Task, {foreignKey: "UserId"})
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please fill your email"
        },
        isEmail: {
          msg: "Please fill the email with correct email format ( ex: example@mail.com)"
        }
      } 
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please fill your password"
        },
        notEmpty: {
          msg: "Password can't be empty"
        }
      } 
    },
    username:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please fill your username"
        },
        notEmpty: {
          msg: "Username can't be empty"
        },
        isAlphanumeric: {
          msg: "Please fill username with alphanumeric characters only"
        }
      } 
    },
    privilege: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  })

  User.beforeCreate((user, option) => {
    console.log(user)
    user.privilege = "normal-user"
    user.password = hashPassword(user.password)
  })
  return User;
};