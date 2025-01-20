const secureRandom = require("secure-random");
const crypto = require("crypto");

exports.calculateSecureRandom = (numberOfOptions) => {
  const secureKey = secureRandom(32, { type: "Buffer" }).toString("hex");
  // console.log(`The key: ${secureKey}. Its length is ${secureKey.length}`);

  const randomNumber = String(Math.floor(Math.random() * 6));
  // console.log(`The random number: ${randomNumber}`);

  const hmac = crypto
    .createHmac("sha3-256", secureKey)
    .update(randomNumber)
    .digest("hex");
  // console.log(`The HMAC: ${hmac}`);

  return { secureKey: secureKey, randomNumber: randomNumber, hmac: hmac };
};
