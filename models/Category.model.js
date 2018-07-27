const Sequelize = require('sequelize');
const uuidv4 = require('uuid/v4');

module.exports = (sequelize) => {
  const Category = sequelize.define('Category', {
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: uuidv4(),
    }
  });

  return Category;
};