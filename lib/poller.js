
function BlockchainPoller(options) {
  this.lastBlockHash = options.lastBlockHash;
  this.blockchainClient = options.blockchainClient;
  this.timeout = options.timeout || 2000;
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
        setTimeout(next, _this.timeout);
      } else {
        onBlock(block, next);
      }
    });
  } 
}

module.exports = BlockchainPoller;

