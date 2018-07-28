const _ = require('lodash');
const { Category, Expense } = sequelizeInstance.db.models;

/*
  @api [post] /api/categories
  description: Create a category
  tags: ['Categories']
  parameters:
    - in: body
      name: body
      required: true
      schema:
        type: object
        properties:
          title:
            type: string
            example: Leisure
          description:
            type: string
            example: Neque blanditiis consequuntur esse autem harum eligendi aut.
  responses:
    "200":
      schema:
        type: object
        properties:
          title:
            type: string
            example: Leisure
          description:
            type: string
            example: Neque blanditiis consequuntur esse autem harum eligendi aut.
          id:
            type: string
            example: 0a5d0ccf-50b8-47af-bd89-49dfb4d0419f
          createdAt:
            type: string
            example: 2018-07-27T14:19:45.000Z
          updatedAt:
            type: string
            example: 2018-07-27T14:19:45.000Z
*/
module.exports.createOne = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const categoryResult = await Category.create({
      title,
      ...(!_.isNull(description) ? { description } : {}),
    });

    return res.json({
      data: categoryResult,
      message: `Category ${categoryResult.id} created.`,
    });
  } catch (e) {
    next(e);
  }
};

/*
  @api [get] /api/categories
  description: Get all categories
  tags: ['Categories']
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
            description:
              type: string
              example: Neque blanditiis consequuntur esse autem harum eligendi aut.
            id:
              type: string
              example: 0a5d0ccf-50b8-47af-bd89-49dfb4d0419f
            createdAt:
              type: string
              example: 2018-07-27T14:19:45.000Z
            updatedAt:
              type: string
              example: 2018-07-27T14:19:45.000Z
*/
module.exports.fetchAll = async (req, res, next) => {
  try {
    const categoryResults = await Category.findAll({
      raw: true,
      order: [['title', 'ASC']],
    });
    return res.json(categoryResults);
  } catch (e) {
    next(e);
  }
};

/*
  @api [get] /api/categories/{category_id}
  description: Fetch category details
  tags: ['Categories']
  parameters:
    - in: path
      name: category_id
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
          description:
            type: string
            example: Neque blanditiis consequuntur esse autem harum eligendi aut.
          id:
            type: string
            example: 0a5d0ccf-50b8-47af-bd89-49dfb4d0419f
          createdAt:
            type: string
            example: 2018-07-27T14:19:45.000Z
          updatedAt:
            type: string
            example: 2018-07-27T14:19:45.000Z
*/

module.exports.fetchOne = async (req, res, next) => {
  try {
    const { category_id } = req.params;

    const categoryResult = await Category.findOne({
      where: { id: category_id },
      raw: true,
    });

    if (!categoryResult) {
      return next({
        statusCode: 400,
        message: 'Invalid category id',
      });
    }

    return res.json(categoryResult);
  } catch (e) {
    next(e);
  }
};

/*
  @api [put] /api/categories/{category_id}
  description: Update a category
  tags: ['Categories']
  parameters:
    - in: path
      name: category_id
      required: true
      example: 0a5d0ccf-50b8-47af-bd89-49dfb4d0419f
      type: string
    - in: body
      name: body
      required: true
      schema:
        type: object
        properties:
          title:
            type: string
            example: Leisure
          description:
            type: string
            example: Neque blanditiis consequuntur esse autem harum eligendi aut.
  responses:
    "200":
      schema:
        type: object
        properties:
          title:
            type: string
            example: Leisure
          description:
            type: string
            example: Neque blanditiis consequuntur esse autem harum eligendi aut.
          id:
            type: string
            example: 0a5d0ccf-50b8-47af-bd89-49dfb4d0419f
          createdAt:
            type: string
            example: 2018-07-27T14:19:45.000Z
          updatedAt:
            type: string
            example: 2018-07-27T14:19:45.000Z
*/
module.exports.updateOne = async (req, res, next) => {
  try {
    const { category_id } = req.params;
    const { title, description } = req.body;

    const categoryResult = await Category.findOne({
      where: { id: category_id },
    });

    if (!categoryResult) {
      return next({
        statusCode: 400,
        message: 'Invalid category id',
      });
    }

    if (categoryResult.permanent) {
      return next({
        statusCode: 400,
        message: 'Cannot modify a permanent category',
      });
    }

    await categoryResult.update({
      ...(!_.isNull(title) ? { title } : {}),
      ...(!_.isNull(description) ? { description } : {}),
    });

    return res.json({
      data: categoryResult,
      message: `Category ${category_id} updated.`,
    });
  } catch (e) {
    next(e);
  }
};

/*
  @api [delete] /api/categories/{category_id}
  description: Delete a category
  tags: ['Categories']
  parameters:
    - in: path
      name: category_id
      required: true
      example: 0a5d0ccf-50b8-47af-bd89-49dfb4d0419f
      type: string
  responses:
    "200":
      schema:
        type: object
        properties:
          message:
            example: Category 0a5d0ccf-50b8-47af-bd89-49dfb4d0419f deleted.
*/
module.exports.deleteOne = async (req, res, next) => {
  try {
    const { category_id } = req.params;

    const categoryResult = await Category.findOne({
      where: { id: category_id },
    });

    if (!categoryResult) {
      return next({
        statusCode: 400,
        message: 'Invalid category id',
      });
    }

    if (categoryResult.permanent) {
      return next({
        statusCode: 400,
        message: 'Cannot delete a permanent category',
      });
    }

    const uncategorizedCategory = await Category.findOne({
      where: { title: 'Uncategorized' },
    });

    await Expense.update(
      { category_id: uncategorizedCategory.id },
      { where: { category_id: categoryResult.id } }
    );

    await categoryResult.destroy();

    return res.json({
      message: `Category ${category_id} deleted.`,
    });
  } catch (e) {
    next(e);
  }
};
