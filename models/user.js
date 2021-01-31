'use strict';
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
      // define association here
      User.hasMany(models.Message, { foreignKey: 'user_id' })
      User.hasMany(models.Participant, { foreignKey: 'user_id' })
      // User.hasMany(models.Conversation, { through: 'Participant' })
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'username already taken'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'username cannot be empty!'
        },
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};