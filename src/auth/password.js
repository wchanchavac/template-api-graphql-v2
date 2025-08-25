import argon2 from 'argon2';

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
