const BlockchainPoller = require(__dirname+'/../lib/blockchain_poller.js');
const BlockchainClient = require(__dirname+'/../lib/blockchain_client.js');
const config = require(__dirname+'/../lib/config.js');

blockchainPoller = new BlockchainPoller({
  lastBlockHash: config.get('lastBlockHash'),
  blockchainClient:  new BlockchainClient()
});

blockchainPoller.pollForBlocks(function(block, next) {
  console.log('FOUND '+block.length+ ' transactions');
  console.log('block', block);
  config.set('lastBlockHash', block[0].blockhash);
  config.save(function() {
    next(block[0].blockhash);
  });
});

