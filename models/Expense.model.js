const Sequelize = require('sequelize');

module.exports = sequelize => {
  const Expense = sequelize.define('Expense', {
    title: Sequelize.STRING,
    date: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    value: Sequelize.FLOAT,
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
  });

  return Expense;
};
