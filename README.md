
## Blockchain Monitor

## Installation

    npm install --save blockchain-monitor

## Usage

    const blockchain = require('blockchain-monitor');

    const blockchainClient = new blockchain.Client({
      host: "54.81.151.76",
      port: 443,
      user: "someRpcUser",
      pass: "sup3rstr0ngRpCP@ssw0rd",
      confirmations: 3,
      type: 'dogecoin'
    })

    const blockchainPoller = new blockchain.Poller({
      lastBlockHash: config.get('lastBlockHash'),
      blockchainClient:  blockchainClient
    });

    blockchainPoller.pollForBlocks(function(block, next) {
      block.forEach(transaction, function(transaction) {
        // do something with the transaction
        sendTextMessageAlert(transaction);  
      });
      next(); // proceed to the next block of transactions
    });

