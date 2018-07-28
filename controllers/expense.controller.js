const _ = require('lodash');
const { Expense, Category } = sequelizeInstance.db.models;

/*
  @api [post] /api/expenses
  description: Create a expense
  tags: ['Expenses']
  parameters:
    - in: body
      name: body
      required: true
      schema:
        type: object
        properties:
          category_id:
            type: string
            example: 0a5d0ccf-50b8-47af-bd89-49dfb4d0419f
          title:
            type: string
            example: Leisure
          date:
            type: string
            example: 2018-07-27T18:33:39.000Z
          value:
            type: float
            example: 100.00
  responses:
    "200":
      schema:
        type: object
        properties:
          title:
            type: string
            example: Leisure
          date:
            type: string
            example: 2018-07-27T14:19:45.000Z
          id:
            type: string
            example: 0a5d0ccf-50b8-47af-bd89-49dfb4d0419f
          value:
            type: float
            example: 100.00
          category_id:
            type: string
            example: 50b8-47af-bd89-49dfb4d0419f-0a5d0ccf
          createdAt:
            type: string
            example: 2018-07-27T14:19:45.000Z
          updatedAt:
            type: string
            example: 2018-07-27T14:19:45.000Z
          category:
            type: object
            properties:
              title:
                type: string
                example: Business
*/
module.exports.createOne = async (req, res, next) => {
  try {
    const { title, description, category_id, value, date } = req.body;

    const category = await Category.findOne({ where: { id: category_id }, raw: true});

    if(category_id && !category) {
      return next({
        statusCode: 400,
        message: `Category ${category_id} does not exist`
      })
    }

    const expenseResult = await Expense.create({
      title,
      value,
      date,
      ...(!_.isNull(description) ? { description } : {}),
      ...(!_.isNull(category_id) ? { category_id } : {}),
    });

    return res.json({
      data: expenseResult,
      message: `Expense ${expenseResult.id} created.`,
    });
  } catch (e) {
    next(e);
  }
};

/*
  @api [get] /api/expenses
  description: Get all expenses
  tags: ['Expenses']
  responses:
    "200":
      schema:
        type: array
        items:
          type: object
          properties:
            title:
              type: string
              example: Leisure
            date:
              type: string
              example: 2018-07-27T14:19:45.000Z
            id:
              type: string
              example: 0a5d0ccf-50b8-47af-bd89-49dfb4d0419f
            value:
              type: float
              example: 100.00
            category_id:
              type: string
              example: 50b8-47af-bd89-49dfb4d0419f-0a5d0ccf
            createdAt:
              type: string
              example: 2018-07-27T14:19:45.000Z
            updatedAt:
              type: string
              example: 2018-07-27T14:19:45.000Z
            category:
              type: object
              properties:
                title:
                  type: string
                  example: Business
*/
module.exports.fetchAll = async (req, res, next) => {
  try {
    const expenseResults = await Expense.findAll({
      order: [['date', 'DESC']],
      include: [{
        model: Category,
        as: 'category',
        attributes: ['title', 'id'],
      }],
    });
    return res.json(expenseResults);
  } catch (e) {
    next(e);
  }
};

/*
  @api [get] /api/expenses/{expense_id}
  description: Fetch expense details
  tags: ['Expenses']
  parameters:
    - in: path
      name: expense_id
      required: true
      type: string
  responses:
    "200":
      schema:
        type: object
        properties:
          title:
            type: string
            example: Leisure
          date:
            type: string
            example: 2018-07-27T14:19:45.000Z
          id:
            type: string
            example: 0a5d0ccf-50b8-47af-bd89-49dfb4d0419f
          value:
            type: float
            example: 100.00
          category_id:
            type: string
            example: 50b8-47af-bd89-49dfb4d0419f-0a5d0ccf
          createdAt:
            type: string
            example: 2018-07-27T14:19:45.000Z
          updatedAt:
            type: string
            example: 2018-07-27T14:19:45.000Z
          category:
            type: object
            properties:
              title:
                type: string
                example: Business
*/

module.exports.fetchOne = async (req, res, next) => {
  try {
    const { expense_id } = req.params;

    const expenseResult = await Expense.findOne({
      where: { id: expense_id },
      raw: true,
      include: [{
        model: Category,
        as: 'category',
        attributes: ['title'],
      }],
    });

    if (!expenseResult) {
      return next({
        statusCode: 400,
        message: 'Invalid expense id',
      });
    }

    return res.json(expenseResult);
  } catch (e) {
    next(e);
  }
};

/*
  @api [put] /api/expenses/{expense_id}
  description: Update a expense
  tags: ['Expenses']
  parameters:
    - in: path
      name: expense_id
      required: true
      example: 0a5d0ccf-50b8-47af-bd89-49dfb4d0419f
      type: string
    - in: body
      name: body
      required: true
      schema:
        type: object
        properties:
          category_id:
            type: string
            example: 0a5d0ccf-50b8-47af-bd89-49dfb4d0419f
          title:
            type: string
            example: Leisure
          date:
            type: string
            example: 2018-07-27T18:33:39.000Z
          value:
            type: float
            example: 100.00
  responses:
    "200":
      schema:
        type: object
        properties:
          title:
            type: string
            example: Leisure
          date:
            type: string
            example: 2018-07-27T14:19:45.000Z
          id:
            type: string
            example: 0a5d0ccf-50b8-47af-bd89-49dfb4d0419f
          value:
            type: float
            example: 100.00
          category_id:
            type: string
            example: 50b8-47af-bd89-49dfb4d0419f-0a5d0ccf
          createdAt:
            type: string
            example: 2018-07-27T14:19:45.000Z
          updatedAt:
            type: string
            example: 2018-07-27T14:19:45.000Z
          category:
            type: object
            properties:
              title:
                type: string
                example: Business
*/
module.exports.updateOne = async (req, res, next) => {
  try {
    const { expense_id } = req.params;
    const { title, description, value, date } = req.body;

    const expenseResult = await Expense.findOne({ where: { id: expense_id } });

    if (!expenseResult) {
      return next({
        statusCode: 400,
        message: 'Invalid expense id',
      });
    }

    await expenseResult.update({
      ...(!_.isNull(date) ? { date } : {}),
      ...(!_.isNull(value) ? { value } : {}),
      ...(!_.isNull(title) ? { title } : {}),
      ...(!_.isNull(description) ? { description } : {}),
    });

    return res.json({
      data: expenseResult,
      message: `Expense ${expense_id} updated.`,
    });
  } catch (e) {
    next(e);
  }
};

/*
  @api [delete] /api/expenses/{expense_id}
  description: Delete a expense
  tags: ['Expenses']
  parameters:
    - in: path
      name: expense_id
      required: true
      example: 0a5d0ccf-50b8-47af-bd89-49dfb4d0419f
      type: string
  responses:
    "200":
      schema:
        type: object
        properties:
          message:
            example: Expense 0a5d0ccf-50b8-47af-bd89-49dfb4d0419f deleted.
*/
module.exports.deleteOne = async (req, res, next) => {
  try {
    const { expense_id } = req.params;

    const expenseResult = await Expense.findOne({ where: { id: expense_id } });

    if (!expenseResult) {
      return next({
        statusCode: 400,
        message: 'Invalid expense id',
      });
    }

    await expenseResult.destroy();

    return res.json({
      message: `Expense ${expense_id} deleted.`,
    });
  } catch (e) {
    next(e);
  }
};

/*
  @api [get] /api/total_expenses
  description: Get total expenses
  tags: ['Expenses']
  responses:
    "200":
      schema:
        type: object
        properties:
          totalExpenses:
            type: number
            example: 123123.23
*/
module.exports.fetchTotalExpenses = async (req, res, next) => {
  try {
    const expenseResults = await Expense.findAll({
      attributes: ['value'],
      raw: true,
    });

    const totalExpenses = _.sum(expenseResults.map((expense) => expense.value)) || 0;

    return res.json({
      data: {
        totalExpenses,
      }
    });
  } catch (e) {
    next(e);
  }
};
