import { importPKCS8, importSPKI, jwtVerify, SignJWT } from 'jose';

const issuer = process.env.ISSUER;
const audience = process.env.AUDIENCE;

const privPem = process.env.JWT_ED25519_PRIVATE_KEY;
const pubPem = process.env.JWT_ED25519_PUBLIC_KEY;
const kid = process.env.JWKS_ACTIVE_KID;

const privateKey = await importPKCS8(privPem, 'EdDSA');

/**
 *
 * @param {import('jose').JWTPayload} payload
 * @returns
 */
export async function issueToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'EdDSA', kid, typ: 'JWT' })
    .setIssuer(issuer)
    .setAudience(audience)
    .setIssuedAt()
    .setExpirationTime('10m')
    .sign(privateKey);
}

export async function verifyToken(token) {
  const publicKey = await importSPKI(pubPem, 'EdDSA');

  const { payload } = await jwtVerify(token, publicKey, {
    issuer: issuer,
    audience: audience,
  });
  return payload;
}
