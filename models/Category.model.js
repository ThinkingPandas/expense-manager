const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Category = sequelize.define('Category', {
    title: { type: Sequelize.STRING, allowNull: false },
    description: { type: Sequelize.STRING, defaultValue: '' },
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    permanent: { type: Sequelize.BOOLEAN, defaultValue: false }
  });

  return Category;
};