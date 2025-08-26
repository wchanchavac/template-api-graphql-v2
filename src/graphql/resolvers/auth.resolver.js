import crypto from 'crypto';
import { Op } from 'sequelize';
import { GraphQLError } from 'graphql';
import { sendPasswordResetEmail } from '#config/nodemailer';
import { hashPasswordDeterministic } from '#auth/password';

export default {
  Mutation: {
    requestPasswordReset: async (_, { email }, { db, req }) => {
      const user = await db.User.findOne({ where: { email } });

      if (!user) {
        return {
          code: 'PASSWORD_RESET_REQUESTED',
          message:
            'If an account with this email exists, a password reset link has been sent.',
        };
      }

      const now = new Date();
      const fiveMinutesFromNow = new Date(now.getTime() + 5 * 60 * 1000);

      const existingToken = await db.PasswordResetToken.findOne({
        where: {
          userId: user.id,
          expiratedAt: {
            [Op.gt]: fiveMinutesFromNow,
          },
          usedAt: null,
        },
      });

      if (existingToken) {
        return {
          code: 'PASSWORD_RESET_REQUESTED',
          message:
            'If an account with this email exists, a password reset link has been sent.',
        };
      }

      const token = crypto.randomBytes(32).toString('hex');
      const thirtyMinutesFromNow = new Date(now.getTime() + 30 * 60 * 1000);
      const requestIp =
        req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      const requestAgent = req.headers['user-agent'];

      await db.PasswordResetToken.create({
        token,
        userId: user.id,
        expiratedAt: thirtyMinutesFromNow,
        requestIp,
        requestAgent,
      });

      // Send password reset email
      const resetUrl =
        process.env.APP_RESET_PASSWORD_URL ||
        'http://localhost:3000/reset-password';
      await sendPasswordResetEmail(user.email, token, resetUrl);

      return {
        code: 'PASSWORD_RESET_REQUESTED',
        message:
          'If an account with this email exists, a password reset link has been sent.',
      };
    },

    validatePasswordResetToken: async (_, { token }, { db }) => {
      const now = new Date();

      const tmpToken = hashPasswordDeterministic(token);

      const resetToken = await db.PasswordResetToken.findOne({
        where: {
          token: tmpToken,
          usedAt: null,
        },
      });

      if (!resetToken) {
        throw new GraphQLError('Token does not exist.', {
          extensions: {
            code: 'TOKEN_NOT_FOUND',
          },
        });
      }

      if (resetToken.expiratedAt <= now) {
        throw new GraphQLError('Token has expired.', {
          extensions: {
            code: 'TOKEN_EXPIRED',
          },
        });
      }

      return {
        code: 'TOKEN_VALID',
        message: 'Token is valid.',
      };
    },

    resetPassword: async (_, { input }, { db }) => {
      const { token, password } = input;
      const now = new Date();

      const tmpToken = hashPasswordDeterministic(token);

      const resetToken = await db.PasswordResetToken.findOne({
        where: {
          token: tmpToken,
          usedAt: null,
        },
        include: [db.User],
      });

      if (!resetToken) {
        throw new GraphQLError('Token does not exist.', {
          extensions: {
            code: 'TOKEN_NOT_FOUND',
          },
        });
      }

      if (resetToken.expiratedAt <= now) {
        throw new GraphQLError('Token has expired.', {
          extensions: {
            code: 'TOKEN_EXPIRED',
          },
        });
      }

      if (!resetToken.user) {
        throw new GraphQLError('Token is not associated with a valid user.', {
          extensions: {
            code: 'INVALID_TOKEN',
          },
        });
      }

      const user = resetToken.user;
      await user.changePassword(password);

      resetToken.usedAt = now;
      await resetToken.save();

      return {
        code: 'PASSWORD_RESET_COMPLETED',
        message: 'Password has been reset successfully.',
      };
    },
  },
};
