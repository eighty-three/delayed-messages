const withPreact = require('next-plugin-preact');

module.exports = withPreact({
  env: {
    PORT: process.env.PORT,
    HOST: process.env.HOST
  }
});
