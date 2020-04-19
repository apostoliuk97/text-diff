const path = require('path');


console.log('react-app-rewire-yarn-workspaces');

module.exports = function override(config) {
  // For import with absolute path
  config.resolve.modules = [path.resolve('../../packages')].concat(config.resolve.modules);

  return config;
};
