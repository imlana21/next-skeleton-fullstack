const path = require('path');

module.exports = {
  reactStrictMode: true,
  sassOptions: [path.join(__dirname, 'styles')],  
  path: {
    '@component/*': 'component/*',
    '@database/*': 'database/*'
  }
};
