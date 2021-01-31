'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Participant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Participant.belongsTo(models.User, { foreignKey: 'user_id' })
      Participant.belongsTo(models.Conversation, { foreignKey: 'conv_id' })
    }
  };
  Participant.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          args: true,
          msg: 'Insert a valid user ID!'
        },
      }
    },
    conv_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: {
          args: true,
          isInt: 'Insert a valid conversation ID!'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Participant',
  });
  return Participant;
};