import { GraphQLError } from 'graphql';
import { importPKCS8, importSPKI, jwtVerify, SignJWT } from 'jose';
import {
  hashPassword,
  hashPasswordDeterministic,
  verifyPassword,
} from '#auth/password';
import User from '#models/user.model';
import AuditLog from '#database/models/audit.model';
import UserRegion from '#database/models/user_region.model';
import Region from '#database/models/region.model';
import UserType from '#database/models/userType.model';
// import AuditLog from '#models/';

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
    .setExpirationTime('10d')
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
 * @param {boolean} noThrow - If true, return null if the user is not found
 * @returns
 */
export async function getSession(req, permissions = '', noThrow = false) {
  const decoded = await verifyToken(req);

  const organizationId = req.headers['x-organization-id'];

  const user = await User.findByPk(decoded.sub, {
    include: [
      {
        model: Region,
        through: {
          attributes: [],
        },
      },
      {
        model: UserType,
        attributes: ['id', 'name', 'level', 'permissions'],
      },
    ],
  });

  if (!user) {
    if (noThrow) {
      return null;
    }

    throw new GraphQLError('Unauthorized', {
      extensions: {
        code: 'UNAUTHORIZED',
      },
    });
  }

  const userData = user.toJSON();

  if (!userData.userType.permissions.includes(permissions)) {
    if (noThrow) {
      return null;
    }

    throw new GraphQLError('Forbidden', {
      extensions: {
        code: 'FORBIDDEN',
      },
    });
  }

  return {
    decoded,
    session: {
      ...userData,
      organizationId:
        userData.userType.id == 'acbe289b-656d-4036-b010-ef2ce540ab00'
          ? organizationId
          : userData.organizationId,
      regionId: 'ALL',
      stageId: userData.userType.stages,
    },
    userData: {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      organizationId: userData.organizationId,
    },
    createdData: {
      organizationId:
        userData.userType.id === 'acbe289b-656d-4036-b010-ef2ce540ab00'
          ? organizationId
          : userData.organizationId,
      createdBy: userData.id,
    },
  };
}

export function addAuthMethodsToModel(model, options = { field: 'password' }) {
  // Método de instancia para autenticar
  model.prototype.authenticate = async function (password) {
    return await verifyPassword(password, this[options.field]);
  };

  // Método de instancia para cambiar el password
  model.prototype.changePassword = async function (newPassword) {
    this[options.field] = newPassword;
    await this.save();
  };

  // Hook para hashear el password antes de crear o actualizar
  model.addHook('beforeSave', async (instance) => {
    if (instance.changed(options.field)) {
      instance[options.field] = await hashPassword(instance[options.field]);
    }
  });
}

export function addDeterministicAuthMethodsToModel(
  model,
  options = { field: 'password' },
) {
  // Hook para hashear el password antes de crear o actualizar
  model.addHook('beforeSave', async (instance) => {
    if (instance.changed(options.field)) {
      instance[options.field] = hashPasswordDeterministic(
        instance[options.field],
      );
    }
  });
}

/**
 * @param {import('sequelize').Model} model
 * @param {import('sequelize').Association<Model<any, any>, Model<any, any>>[]} associations
 */
export function addAuditHooksToModel(model, associations = []) {
  /**
   * @param {import('sequelize').Model} instance
   * @param {import('sequelize').Options} options
   */
  model.addHook('afterCreate', async (instance, options) => {
    const { createdBy = {} } = options || {};
    const transaction = options.transaction || null;
    const relatedData = {};

    const table = model.getTableName();

    const changedFields = instance.changed();
    let newData = {};

    if (Array.isArray(changedFields)) {
      for (const field of changedFields || []) {
        const association = associations.find(
          (association) => association.field === field,
        );

        if (association) {
          relatedData[field] = await association.model.findByPk(
            instance[field],
            {
              attributes: association.attributes,
            },
          );

          const property = association.field.slice(0, -2);
          newData[property] = relatedData[field];
        }

        newData[field] = instance.dataValues[field];
      }
    }

    try {
      await AuditLog.create(
        {
          event: 'CREATE',
          entity: table,
          entityId: instance.dataValues.id,
          newData,
          previousData: {},
          createdBy,
        },
        { transaction },
      );
    } catch (error) {
      console.error(error);
      await AuditLog.create({
        event: 'CREATE',
        entity: table,
        entityId: instance.dataValues.id,
        error: error.message,
        createdBy: {},
        newData: {
          ...instance.dataValues,
        },
        previousData: {},
      });
    }

    return instance;
  });

  // Hook for updates
  model.addHook('beforeUpdate', async (instance, options) => {
    const { createdBy = {} } = options || {};
    const transaction = options.transaction || null;
    const previousData = instance._previousDataValues;
    const relatedData = {};

    const table = model.getTableName();
    const changedFields = instance.changed();
    let newData = {};

    console.log(changedFields);

    if (Array.isArray(changedFields)) {
      for (const field of changedFields || []) {
        const association = associations.find(
          (association) => association.field === field,
        );

        if (association) {
          relatedData[field] = await association.model.findByPk(
            instance[field],
            {
              attributes: association.attributes,
            },
          );

          console.log(relatedData[field].toJSON());
          console.log(relatedData[field].toJSON());

          const property = association.field.slice(0, -2);
          newData[property] = relatedData[field];
        }

        newData[field] = instance.dataValues[field];
      }
    }

    try {
      await AuditLog.create({
        event: 'UPDATE',
        entity: table,
        entityId: instance.dataValues.id,
        newData,
        previousData: {
          ...previousData,
        },
        createdBy,
      });
    } catch (error) {
      console.error(error);
      await AuditLog.create({
        event: 'UPDATE',
        entity: table,
        entityId: instance.dataValues.id,
        error: error.message,
        createdBy,
      });
    }
  });

  // Hook for deletions
  model.addHook('beforeDestroy', async (instance, options) => {
    const { createdBy = {} } = options || {};
    const transaction = options.transaction || null;
    const relatedData = {};

    const table = model.getTableName();

    try {
      await AuditLog.create({
        event: 'DELETE',
        entity: table,
        entityId: instance.dataValues.id,
        previousData: {},
        newData: {},
        createdBy,
      });
    } catch (error) {
      console.error(error);
      await AuditLog.create({
        event: 'DELETE',
        entity: table,
        entityId: instance.dataValues.id,
        error: error.message,
        previousData: {},
        newData: {},
        createdBy,
      });
    }

    return instance;
  });

  return model;
}
