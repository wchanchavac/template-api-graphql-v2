import { GraphQLError } from 'graphql';
import { importPKCS8, importSPKI, jwtVerify, SignJWT } from 'jose';
import { hashPassword, verifyPassword } from './password';

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

/**
 *
 * @param {import('http').Request} req
 * @returns
 */
export async function verifyToken(req) {
  const authorization = req.headers['authorization'];

  if (!authorization) {
    throw new GraphQLError('Unauthorized', {
      extensions: {
        code: 'UNAUTHORIZED',
      },
    });
  }

  const parts = authorization.split(/\s/);

  if (parts.length !== 2) {
    throw new GraphQLError('Unauthorized', {
      extensions: {
        code: 'UNAUTHORIZED',
      },
    });
  }

  const [schema, token] = parts;

  if (schema !== 'Bearer') {
    throw new GraphQLError('Unauthorized', {
      extensions: {
        code: 'UNAUTHORIZED',
      },
    });
  }

  if (!token) {
    throw new GraphQLError('Unauthorized', {
      extensions: {
        code: 'UNAUTHORIZED',
      },
    });
  }

  const publicKey = await importSPKI(pubPem, 'EdDSA');

  const { payload } = await jwtVerify(token, publicKey, {
    issuer: issuer,
    audience: audience,
  });

  return payload;
}

/**
 *
 * @param {import('http').Request} req
 * @returns
 */
export async function getSession(req) {
  const decoded = await verifyToken(req);

  return decoded;
}

export function addAuthMethodsToModel(model, options = { field: 'password' }) {
  // Método de instancia para autenticar
  model.prototype.authenticate = async function (password) {
    return await verifyPassword(password, this[options.field]);
  };

  // Método de instancia para cambiar el password
  model.prototype.changePassword = async function (newPassword) {
    this[options.field] = await hashPassword(newPassword);
    await this.save();
  };

  // Hook para hashear el password antes de crear o actualizar
  model.addHook('beforeSave', async (instance) => {
    if (instance.changed(options.field)) {
      instance[options.field] = await hashPassword(instance[options.field]);
    }
  });
}
