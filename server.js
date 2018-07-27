require('./globals.js')
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// routes
const apiRoutes = require('./routes.js');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', apiRoutes);

app.listen(process.env.PORT || 3000, async () => {
  try {
    logInfo('Setting up database tables...');
    await sequelizeInstance.db.sync()
    logInfo('DONE Setting up database tables');

    logInfo('Adding test data...');
    await sequelizeInstance.loadTestData()
    logInfo('DONE adding test data');
    logInfo('API Server listening on port 3000!');
  } catch(e) {
    logError(e)
  }
});
