const validate = require('webpack-validator')
module.exports = validate(require('./config/webpack.common.js'), {
  quiet: true
});
