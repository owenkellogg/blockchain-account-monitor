const BlockchainPoller = require(__dirname+'/../lib/blockchain_poller.js');
const BlockchainClient = require(__dirname+'/../lib/blockchain_client.js');
const config = require(__dirname+'/../lib/config.js');

describe('Blockchain Poller', function() {

  before(function() {
    blockchainPoller = new BlockchainPoller({
      lastBlockHash: config.get('lastBlockHash'),
      blockchainClient:  new BlockchainClient()
    });
  });

  it('accepts a function to call when a block with new transactions is discovered', function(done) {
  
    blockchainPoller.pollForBlocks(function(block, next) {
      config.set('lastBlockHash', block.hash);
      next();
      done();
    });
  });

  it('should not advance if an error is received', function(callback) {
    blockchainPoller.pollForBlocks(function(block, next, done) {
      delete block;
      next(new Error('AccidentalBlockDeletionError'));
      callback();
    });
  });

  it('#stop should stop the polling behavior', function() {
    var blocks = 0;
    blockchainPoller.pollForBlocks(function(block, next) {
      if (blocks+=1 > 3) {
        return blockchainPoller.stopPollingForBlocks();
      }
      next();
    });
  });

});

