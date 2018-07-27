const debug = require('debug')('routes.js')
const express = require('express');
const Joi = require('joi');
const ev = require('express-validation');
const router = express.Router();

// controllers
const expenseCtrl = require('./controllers/expense.controller.js');
const reportsCtrl = require('./controllers/reports.controller.js');
const categoryCtrl = require('./controllers/category.controller.js');

// expenses routes
router.route('/expenses')
  .get(expenseCtrl.fetchAll)
router.route('/expenses/:category_id')
  .get(expenseCtrl.fetchOne)
  .put(expenseCtrl.updateOne)
  .delete(expenseCtrl.deleteOne);


// reports routes
router.route('/reports')
  .get(reportsCtrl.fetchAll)
  .get(reportsCtrl.fetchOne)
  .put(reportsCtrl.updateOne)
  .delete(reportsCtrl.deleteOne);


// categories routes
router.route('/categories')
  .get(categoryCtrl.fetchAll)
router.route('/categories/:category_id')
  .get(categoryCtrl.fetchOne)
  .put(categoryCtrl.updateOne)
  .delete(categoryCtrl.deleteOne);



router.use((err, req, res, next) => { // eslint-disable-line
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
