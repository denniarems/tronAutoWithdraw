const TronWeb = require('tronweb');

function getBTTBalance(asset) {
  return asset.key === '1002000';
}
async function app(to, from, privatekey) {
  const tronWeb = new TronWeb(
    {
      fullNode: 'https://api.trongrid.io',
      solidityNode: 'https://api.trongrid.io',
      eventServer: 'https://api.trongrid.io',
    },
    privatekey
  );
  var accountDt = await tronWeb.trx.getAccount(from);
  var bttBalance = accountDt.assetV2.find(getBTTBalance).value;
  if (bttBalance > 900000) {
    var data = await tronWeb.transactionBuilder.sendToken(
      to,
      bttBalance,
      '1002000',
      from
    );
    const signedtxn = await tronWeb.trx.sign(data, privatekey);
    await tronWeb.trx.sendRawTransaction(signedtxn);
  }
}
const interval = setInterval(function () {
  app(
    'to address',
    'from address',
    'private key'
  );
}, 10000);