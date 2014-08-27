const BlockchainAccountMonitor = require(__dirname+'/../lib/blockchain_account_monitor.js');
const BlockchainClient = require(__dirname+'/../lib/blockchain_client.js');
const config = require(__dirname+'/../lib/config.js');

const monitor = new BlockchainAccountMonitor({
  blockchainClient:  new BlockchainClient({
    host: config.get('RPC_HOST'),
    port: config.get('RPC_PORT'),
    user: config.get('RPC_USER'),
    pass: config.get('RPC_PASSWORD'),
    confirmations: config.get('RPC_CONFIRMATIONS'),
    type: config.get('RPC_TYPE')
  }),
  onBlock: function(block, next) {
    console.log('FOUND '+block.length+ ' transactions');
    console.log('block', block);
    next();
  },
  timeout: 1000
});

monitor.lastBlockHash = config.get('LAST_BLOCK_HASH');

monitor.start();

