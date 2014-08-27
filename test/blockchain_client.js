const BlockchainClient = require(__dirname+'/../lib/blockchain_client.js');
const config = require(__dirname+'/../lib/config.js');

describe('Dogecoin Client', function() {
  before(function() {
    console.log('user', config.get('RPC_USER'));
    client = new BlockchainClient({
      host: config.get('RPC_HOST'),
      port: config.get('RPC_PORT'),
      user: config.get('RPC_USER'),
      pass: config.get('RPC_PASSWORD'),
      confirmations: config.get('RPC_CONFIRMATIONS'),
      type: config.get('RPC_TYPE')
    });
    console.log('CLIENT', client);
  });

  it('should get the balance', function(done) {
    client.coinDaemon.listTransactions(function(error, balance){
      console.log(error, balance);
      done();
    });
  });
});
