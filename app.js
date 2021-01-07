const TronWeb = require("tronweb");
require("dotenv").config();
function getBTTBalance(asset) {
  return asset.key === "1002000";
}
async function app(to, from, privatekey) {
  const tronWeb = new TronWeb(
    {
      fullNode: "https://api.trongrid.io",
      solidityNode: "https://api.trongrid.io",
      eventServer: "https://api.trongrid.io",
    },
    privatekey
  );
  const accountDt = await tronWeb.trx.getAccount(from);
  const bttBalance = accountDt.assetV2.find(getBTTBalance).value;
  if (bttBalance > 900000) {
    const data = await tronWeb.transactionBuilder.sendToken(
      to,
      bttBalance,
      "1002000",
      from
    );
    const signedtxn = await tronWeb.trx.sign(data, privatekey);
    await tronWeb.trx.sendRawTransaction(signedtxn);
  }
}
const to = process.env.TO;
const froms = process.env.FROM.split(",");
const keys = process.env.KEY.split(",");
for (const [i, key] of keys.entries()) {
  const interval = setInterval(function () {
    app(to, froms[i], key);
  }, 10000);
}
