const Sequelize = require('sequelize');
const uuidv4 = require('uuid/v4');

module.exports = (sequelize) => {
  const Category = sequelize.define('Category', {
    title: { type: Sequelize.STRING, allowNull: false },
    description: { type: Sequelize.STRING, defaultValue: '' },
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: uuidv4(),
    }
  });

  return Category;
};