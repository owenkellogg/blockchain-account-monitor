const dogecoind = require(__dirname+'/../lib/node_dogecoin');
const BlockchainClient = require(__dirname+'/../lib/blockchain_client.js');

describe('Dogecoin Client', function() {
  before(function() {
    client =  new BlockchainClient();
  });
  it('should get the balance', function(done) {
    dogecoind.getBalance(function(error, balance){
      console.log(error, balance);
      done();
    });
  });
  /*
  it('#listNextBlock should list all transactions in the next block with transactions', function() {
    client.listNextBlock('previousBlockHash', function(error, transactions) {
      assert(transactions.length > 0);
      assert(transactions[0].blockhash);
    });
  });
  */
});
