module.exports = {
  MYSQL_URL_CONNECTION_STRING: process.env.MYSQL_URL_CONNECTION_STRING || 'mysql://root:root@127.0.0.1:3306/expense-manager',
  FAKE_DATA_SEED: 1337, // used as seed for faker in order to generate consistent fake data
  PORT: process.env.PORT || 8080, // server port
  HOST: process.env.HOST || '127.0.0.1',
  HTTP_PROTOCOL: process.env.HTTP_PROTOCOL || 'http',
}