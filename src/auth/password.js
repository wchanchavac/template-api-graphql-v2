import argon2 from 'argon2';
import crypto from 'crypto';

const secret = process.env.ARGOM2_SECRET;

/**
 *
 * @param {string} password
 */
export async function hashPassword(password) {
  try {
    const hash = await argon2.hash(password, {
      secret: Buffer.from(secret),
    });

    return hash;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to hash password');
  }
}

/**
 *
 * @param {string} password
 * @param {string} hash
 */
export async function verifyPassword(password, hash) {
  try {
    const verified = await argon2.verify(hash, password, {
      secret: Buffer.from(secret),
    });

    return verified;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to verify password');
  }
}

/**
 *
 * @param {string} password
 */
export function hashPasswordDeterministic(password) {
  return crypto
    .createHash('sha256')
    .update(password + process.env.TOKEN_SECRET)
    .digest('hex');
}
