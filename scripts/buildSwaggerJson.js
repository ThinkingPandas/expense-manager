const swaggerInline = require('swagger-inline');
const fs = require('fs');
const { HTTP_PROTOCOL, HOST, PORT } = require('../config.js');

const apis = fs.readdirSync(`${__dirname}/../controllers`).map((s) => `${__dirname}/../controllers/${s}`);

/*
 * run while in root folder
 */
buildSwagger(apis, 'swagger.json');

function buildSwagger(arr, filename) {
  swaggerInline([...arr], {
    base: 'api-doc/swaggerBase.json',
  }).then(generatedSwagger => {
    generatedSwagger = generatedSwagger
      .replace('HOST_STRING', `${HTTP_PROTOCOL}://${HOST}:${PORT}`)
      .replace('HTTP_PROTOCOL', HTTP_PROTOCOL);

    fs.writeFile(`./api-doc/${filename}`, generatedSwagger, 'utf8', err => {
      if (err) throw new Error(err);
      console.log('Successfully built swagger'); //eslint-disable-line
    });
  });
}
