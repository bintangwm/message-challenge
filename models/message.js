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
    content: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    conv_id: DataTypes.INTEGER,
    reply_msg_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};