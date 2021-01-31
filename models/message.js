'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Message.belongsTo(models.User, { foreignKey: 'user_id' })
      Message.belongsTo(models.Conversation, { foreignKey: 'conv_id' })
      Message.belongsTo(models.Message, { as: 'reply', foreignKey: 'reply_msg_id', allowNull: true });
    }
  };
  Message.init({
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'message cannot be empty!'
        }
      }
    },
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
    },
    reply_msg_id: {
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
    modelName: 'Message',
  });
  return Message;
};