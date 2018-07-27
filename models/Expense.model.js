const Sequelize = require('sequelize');
const uuidv4 = require('uuid/v4');

module.exports = sequelize => {
  const Expense = sequelize.define('Expense', {
    title: Sequelize.STRING,
    date: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    value: Sequelize.FLOAT,
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: uuidv4(),
    },
  });

  Expense.associate = function(models) {
    models.Expense.belongsTo(models.Category, { foreignKey: 'fk_category' });
  };

  return Expense;
};
