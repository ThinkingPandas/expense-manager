const Sequelize = require('sequelize');
const { MYSQL_URL_CONNECTION_STRING } = require('../config.js');
const sequelizeFixtures = require('sequelize-fixtures');
const fixtures = require('../fixtures.js');

// setup database here also for simplicity
const sequelize = new Sequelize(MYSQL_URL_CONNECTION_STRING)

require('./Category.model.js')(sequelize)
require('./Expense.model.js')(sequelize)

// load test data
module.exports = {
  loadTestData: async () => {
    try {
      await sequelizeFixtures.loadFixtures(fixtures(), sequelizeInstance.db.models);
    } catch(e){
      if(e.message === 'Validation error') {
        return logInfo('Fixtures already added. No need to add them again :)')
      }

      throw new Error(e);
    }
  },
  db: sequelize,
}
