/*
  @api [get] /api/categories
  description: Get all categories
  tags: ['Categories']
  parameters:
    - in: body
      name: body
      description: Login a user
      required: true
      schema:
        type: object
        properties:
          email:
            type: string
            example: "demo@demo.com"
          password:
            type: string
            example: "demo"
  responses:
    "200":
      description: "Login token"
      schema:
        type: object
        properties:
          data:
            type: object
            properties:
              token:
                type: string
                example: "JWT_TOKEN HERE"
*/
module.exports.fetchAll = async (req, res, next) => {
  try {
    return res.json([]);
  } catch (e) {
    next(e);
  }
};

/*
  @api [get] /api/categories/{category_id}
  description: Fetch category details
  tags: ['Categories']
  parameters:
    - in: body
      name: body
      description: Login a user
      required: true
      schema:
        type: object
        properties:
          email:
            type: string
            example: "demo@demo.com"
          password:
            type: string
            example: "demo"
  responses:
    "200":
      description: "Login token"
      schema:
        type: object
        properties:
          data:
            type: object
            properties:
              token:
                type: string
                example: "JWT_TOKEN HERE"
*/
module.exports.fetchOne = async (req, res, next) => {
  try {
    return res.json({});
  } catch (e) {
    next(e);
  }
};

/*
  @api [put] /api/categories/{category_id}
  description: Update a category
  tags: ['Categories']
  parameters:
    - in: body
      name: body
      description: Login a user
      required: true
      schema:
        type: object
        properties:
          email:
            type: string
            example: "demo@demo.com"
          password:
            type: string
            example: "demo"
  responses:
    "200":
      description: "Login token"
      schema:
        type: object
        properties:
          data:
            type: object
            properties:
              token:
                type: string
                example: "JWT_TOKEN HERE"
*/
module.exports.updateOne = async (req, res, next) => {
  try {
    return res.json({});
  } catch (e) {
    next(e);
  }
};

/*
  @api [delete] /api/categories/{category_id}
  description: Delete a category
  tags: ['Categories']
  parameters:
    - in: body
      name: body
      description: Login a user
      required: true
      schema:
        type: object
        properties:
          email:
            type: string
            example: "demo@demo.com"
          password:
            type: string
            example: "demo"
  responses:
    "200":
      description: "Login token"
      schema:
        type: object
        properties:
          data:
            type: object
            properties:
              token:
                type: string
                example: "JWT_TOKEN HERE"
*/
module.exports.deleteOne = async (req, res, next) => {
  try {
    return res.json({});
  } catch (e) {
    next(e);
  }
};

