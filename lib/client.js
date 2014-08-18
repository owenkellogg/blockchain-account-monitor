const _ = require('underscore');
const coinDaemon = require('node-dogecoin');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0" 

function BlockchainClient(options) {  
  this.confirmations = options.confirmations || 2;
  this.coinDaemon = coinDaemon({
    host: options.host,
    port: options.port,
    user: options.user,
    pass: options.pass,
    https: (options.https === false) ? false : true
  });
}

BlockchainClient.prototype = {

  listNextBlock: function(previousBlockHash, callback) {
    var _this = this;
    _this.coinDaemon.exec('listsinceblock', previousBlockHash, _this.confirmations,
    function(error, response) {
      if (error) {
        return callback(error, null);
      }
      var transactions = response.transactions; 
      if (!transactions || transactions.length === 0) {
        callback();
      } else {
        var confirmed = _this._filterByMinimumConfirmations(transactions, _this.confirmations);
        if (confirmed.length === 0) {
          var sorted = _this._sortTransactionsByTime(confirmed);
          var nextBlockHash = sorted[0].blockhash;
          callback(null, _this._transactionsInBlock(sorted, nextBlockHash));
        } else {
          callback();
        }
      }
    });
  },
  
  _sortTransactionsByTime: function(transactions) {
    return _.sortBy(transactions, function(transaction){
      return transaction.blocktime;
    }); 
  },

  _transactionsInBlock: function(transactions, blockHash) {
    return _.filter(transactions, function(transaction){
      return transaction.blockhash === blockHash;
    });
  },
  
  _filterByMinimumConfirmations: function(transactions, confirmations) {
    return _.filter(transactions, function(transaction){
      return parseInt(transaction.confirmations) >= confirmations;
    });
  }
}

module.exports = BlockchainClient;

