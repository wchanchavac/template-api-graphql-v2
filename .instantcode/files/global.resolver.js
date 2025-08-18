'use strict';

// const { encode } = require('jwt-simple');

// const env = process.env.NODE_ENV || 'development';
// const application = require('./../../config/application')[env];
// const { ApolloError } = require('apollo-server-express');
// const bcrypt = require('bcrypt');
// const { randomPassword, ufid } = require('../../helpers/methods');
// const { cognito, mail, s3 } = require('../../helpers/sdk');
// const getSession = require('../../middlewares/getSession');

// const { signUp } = require('../../templates/index')
import { GraphQLError } from 'graphql';
import { getSession, issueToken } from '../../auth';

module.exports = {
  Query: {
    async downloadFile(obj, { input }, { req }) {
      const session = await getSession(req);

      const { url } = await s3.file.download(input);

      return {
        url,
        name: input.file,
      };
    },
    version() {
      return '1.0.0';
    },
  },
  Mutation: {
    async signIn(obj, { email, password }, { db }) {
      try {
        const user = await db.User.findOne({
          where: {
            email,
            password,
          },
        });

        if (!user)
          throw new GraphQLError('Invalid credentials', {
            extensions: {
              code: 'UNAUTHORIZED',
            },
          });

        // if (!await bcrypt.compareSync(password, user.password))
        // 	throw new ApolloError(`Invalid credentials`, 'UNAUTHORIZED')
        const token = issueToken({
          sub: user.id,
        });

        return {
          token,
        };
      } catch (e) {
        throw new GraphQLError(e.message, {
          extensions: {
            code: e.code,
          },
        });
      }
    },
    async signUp(obj, { input }, { db }) {
      try {
        const [user, created] = await db.User.findOrCreate({
          where: { email: input.email },
          defaults: input,
        });

        if (created) {
          throw new GraphQLError('User already exists', {
            extensions: {
              code: 'UNAUTHORIZED',
            },
          });
        }

        return {
          message: 'Your registration was successful',
        };
      } catch (e) {
        throw new GraphQLError(e.message, {
          extensions: {
            code: e.code,
          },
        });
      }
    },
    async uploadFile(obj, { input }, { req }) {
      const session = await getSession(req);
      input.file =
        input.key === 'profile' ? `${session.sub}.png` : ufid(input.file);
      const { url } = await s3.file.upload(input);

      return {
        url,
        name: input.file,
      };
    },
  },
};
