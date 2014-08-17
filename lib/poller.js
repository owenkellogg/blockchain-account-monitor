
function BlockchainPoller(options) {
  this.lastBlockHash = options.lastBlockHash;
  this.blockchainClient = options.blockchainClient;
}

BlockchainPoller.prototype = {
  pollForBlocks: function pollForBlocks(onBlock, done) {
    var _this = this;
    var next = function(lastBlockHash) {
      if (lastBlockHash) {
        _this.lastBlockHash = lastBlockHash;
      }
      _this.pollForBlocks(onBlock, done);
    }
    _this.blockchainClient.listNextBlock(_this.lastBlockHash, function(error, block) {
      if (error || !block) {
        next();
      } else {
        onBlock(block, next);
      }
    });
  } 
}

module.exports = BlockchainPoller;

