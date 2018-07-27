/* Setup Loggers */
const debug = require('debug');

global.logError = debug('app:error');
global.logInfo = debug('app:log');

// set this namespace to log via console.log
global.logInfo.log = console.log.bind(console); //eslint-disable-line
global.logError.log = console.error.bind(console); //eslint-disable-line

/* Setup Database */
global.sequelizeInstance = require('./models/index.models.js');