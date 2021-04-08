'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Task.belongsTo(models.User)
    }
  };
  Task.init({
    title:{
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Title can't be empty"
        }
      } 
    },
    category:{
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Please select one of the category"
        }
      } 
    },
    due:{
      type: DataTypes.STRING,
      validate: {
				isDate: {
					msg: "Due Date must be a date string"
				},
      } 
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};