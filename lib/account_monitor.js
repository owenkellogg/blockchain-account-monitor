
function BlockchainAccountMonitor(options) {
  this.lastBlockHash = options.lastBlockHash;
  this.blockchainClient = options.blockchainClient;
  this.timeout = options.timeout || 2000;
  this.onBlock = options.onBlock;
  this.onError = options.onError || function(error) {
    console.log('BlockchainAccountMonitor::Error', error);
  }
}

BlockchainAccountMonitor.prototype = {
  _getNextBlockWithTransactions: function getNextBlockWithTransactions() {
    var _this = this;
    _this.blockchainClient.listNextBlock(_this.lastBlockHash, function(error, block) {
      if (error) {
        _this.onError(error);
        return setTimeout(_this._getNextBlockWithTransactions.bind(_this), _this.timeout);
      }
      if (!block) {
        return setTimeout(_this._getNextBlockWithTransactions.bind(_this), _this.timeout);
      } else {
        return _this.onBlock(block, function() {
          _this.lastBlockHash = block[0].blockhash;
          _this._getNextBlockWithTransactions();
        });
      }
    });
  },
  
  start: function() {
    var _this = this;
    _this._getNextBlockWithTransactions();
  }

}

module.exports = BlockchainAccountMonitor;

