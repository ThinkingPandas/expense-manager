/*
  @api [get] /api/reports
  description: Get all reports
  tags: ['Reports']
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
  @api [get] /api/reports/{expense_id}
  description: Fetch expense details
  tags: ['Reports']
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
  @api [put] /api/reports/{expense_id}
  description: Update a expense
  tags: ['Reports']
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
  @api [delete] /api/reports/{expense_id}
  description: Delete a expense
  tags: ['Reports']
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

