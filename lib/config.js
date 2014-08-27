var config = require('nconf');

config
  .file({ file: __dirname+'/../config.json' });

config.defaults({
  'RPC_HOST': '127.0.0.1',
  'RPC_PORT': 443,
  'RPC_USER': '',
  'RPC_PASSWORD': '',
  'RPC_CONFIRMATIONS': 6,
  'RPC_TYPE': 'bitcoin',
  'LAST_BLOCK_HASH': ''
});

module.exports = config;

