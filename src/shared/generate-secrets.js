import {
  generateKeyPair,
  exportPKCS8,
  exportSPKI,
  exportJWK,
  calculateJwkThumbprint,
} from 'jose';
import fs from 'fs';
import path from 'path';

const alg = process.argv[2] || 'Ed25519';
const crv = process.argv[3] || 'Ed25519';
const role = process.argv[4] || 'access';
const env = process.argv[5] || 'prod';

async function generateKeys() {
  const { publicKey, privateKey } = await generateKeyPair(alg, {
    extractable: true,
  });

  const privPem = await exportPKCS8(privateKey);
  const pubPem = await exportSPKI(publicKey);

  const pubJwk = await exportJWK(publicKey);
  pubJwk.alg = 'EdDSA';
  pubJwk.use = 'sig';
  pubJwk.kid = await calculateJwkThumbprint(pubJwk, 'sha256');

  const secretsDir = path.join(process.cwd(), 'secrets');
  if (!fs.existsSync(secretsDir)) {
    fs.mkdirSync(secretsDir);
  }

  const baseFileName = `jwt-${alg.toLowerCase()}-${crv.toLowerCase()}-${role}-${env}-${
    pubJwk.kid
  }`;
  const privPemPath = path.join(secretsDir, `${baseFileName}.pem`);
  const pubPemPath = path.join(secretsDir, `${baseFileName}.pub.pem`);

  fs.writeFileSync(privPemPath, privPem);
  fs.writeFileSync(pubPemPath, pubPem);

  console.log(`Private key saved to: ${privPemPath}`);
  console.log(`Public key saved to: ${pubPemPath}`);

  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const jwksFileName = `jwks-${env}-${date}.json`;
  const jwksPath = path.join(secretsDir, jwksFileName);

  const jwks = {
    keys: [pubJwk],
  };

  fs.writeFileSync(jwksPath, JSON.stringify(jwks, null, 2));
  console.log(`JWKS file saved to: ${jwksPath}`);
}

generateKeys().catch(console.error);
