const EC = require('elliptic').ec;
const KeyPair = require('elliptic/lib/elliptic/ec/key');

console.log(KeyPair);

const ec = new EC('ed25519');

const message = 'foo';

const key1 = ec.genKeyPair();
const key2 = ec.genKeyPair();

const mixedKey = new KeyPair(ec, {
  priv: key1.getPrivate(),
  pub: key2.getPublic(),
});

const sig1r = key1.sign(message).r.toString()
const sig2r = key2.sign(message).r.toString()
const sig3r = mixedKey.sign(message).r.toString()

console.log(`signed by key1: ${sig1r}`);
console.log(`signed by key2: ${sig2r}`);
console.log(`signed by mixedKey: ${sig3r}`);

if (sig1r === sig3r) {
  console.log("signature 1's r value matches signature 3's r value");
}

