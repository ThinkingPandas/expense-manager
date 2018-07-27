const express = require('express');
const Joi = require('joi');
const ev = require('express-validation');
const router = express.Router();

// controllers
const expenseCtrl = require('./controllers/expense.controller.js');
const reportsCtrl = require('./controllers/reports.controller.js');
const categoryCtrl = require('./controllers/category.controller.js');

// expenses routes
router
  .route('/expenses')
  .post(
    ev({
      body: {
        category_id: Joi.string(),
        title: Joi.string().required(),
        date: Joi.string().required(),
        value: Joi.number().required(),
      },
    }),
    expenseCtrl.createOne
  )
  .get(expenseCtrl.fetchAll);
router
  .route('/expenses/:expense_id')
  .get(
    ev({
      params: {
        expense_id: Joi.string().required(),
      },
    }),
    expenseCtrl.fetchOne
  )
  .put(
    ev({
      params: {
        expense_id: Joi.string().required(),
      },
      body: {
        category_id: Joi.string(),
        title: Joi.string().required(),
        date: Joi.string().required(),
        value: Joi.number().required(),
      },
    }),
    expenseCtrl.updateOne
  )
  .delete(
    ev({
      params: {
        expense_id: Joi.string().required(),
      },
    }),
    expenseCtrl.deleteOne
  );

// reports routes
router
  .route('/reports')
  .get(reportsCtrl.fetchAll);

// categories routes
router
  .route('/categories')
  .post(
    ev({
      body: {
        description: Joi.string(),
        title: Joi.string().required(),
      },
    }),
    categoryCtrl.createOne
  )
  .get(categoryCtrl.fetchAll);

router
  .route('/categories/:category_id')
  .get(
    ev({
      params: {
        category_id: Joi.string().required(),
      },
    }),
    categoryCtrl.fetchOne
  )
  .put(
    ev({
      params: {
        category_id: Joi.string().required(),
      },
      body: {
        description: Joi.string(),
        title: Joi.string(),
      },
    }),
    categoryCtrl.updateOne
  )
  .delete(
    ev({
      params: {
        category_id: Joi.string().required(),
      },
    }),
    categoryCtrl.deleteOne
  );

router.use((err, req, res, next) => {
  // eslint-disable-line
  logError(JSON.stringify(err.stack || err, null, 2));

  if (err instanceof ev.ValidationError) {
    err.statusText = 'Payload Validation Error';
    return res.status(err.status).json(err);
  }

  if (err.statusCode) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  logError(
    JSON.stringify(
      {
        method: req.method,
        baseUrl: req.baseUrl,
        originalUrl: req.originalUrl,
        body: req.body,
        host: req.hostname,
        statusCode: req.statusCode,
      },
      null,
      2
    )
  );

  return res.status(500).json({
    error: err.message,
  });
});

module.exports = router;
