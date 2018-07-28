const moment = require('moment');
const _ = require('lodash');

const { Expense, Category } = sequelizeInstance.db.models;

/*
  @api [get] /api/reports/bar
  description: Get bar chart data
  tags: ['Reports']
  responses:
    "200":
      schema:
        type: object
*/
module.exports.fetchReportBar = async (req, res, next) => {
  try {
    // create return data
    const returnData = {};

    _.range(29).forEach(i => {
      const day = moment()
        .subtract(i, 'days')
        .format('MMM DD');
      returnData[day] = 0;
    });

    // query the expenses
    const where = {
      date: {
        $between: [
          moment()
            .subtract(30, 'days')
            .toDate(),
          moment().toDate(),
        ],
      },
    };

    const expensesResults = await Expense.findAll({
      where,
      attributes: ['value', 'date'],
      raw: true,
      order: [['date', 'DESC']],
    });

    expensesResults.forEach(expense => {
      const day = moment(expense.date).format('MMM DD');
      returnData[day] = +expense.value;
    });

    return res.json({ data: returnData });
  } catch (e) {
    next(e);
  }
};

/*
  @api [get] /api/reports/doughnut
  description: Get dougnut chart data
  tags: ['Reports']
  responses:
    "200":
      schema:
        type: object
*/
module.exports.fetchReportDoughnut = async (req, res, next) => {
  try {
    // create return data
    const returnData = {};
    let total = 0;

    const categories = await Category.findAll();

    for (const category of categories) {
      const expenses = await category.getExpenses({
        raw: true,
        attributes: ['value'],
      });

      returnData[category.title] =
        _.sum(expenses.map(expense => expense.value)) || 0;
      total += returnData[category.title];
    }

    for(const [category, categoryTotal] of Object.entries(returnData)) {
      returnData[category] = +((categoryTotal / total) * 100).toFixed(2);
    }

    return res.json({ data: returnData });
  } catch (e) {
    next(e);
  }
};
