import crypto from 'crypto';
import { Op } from 'sequelize';
import { User, PasswordResetToken } from '#database/models';

export default {
  Mutation: {
    requestPasswordReset: async (_, { email }, { req }) => {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return {
          success: true,
          message: 'Your password has been generated.',
        };
      }

      const now = new Date();
      const fiveMinutesFromNow = new Date(now.getTime() + 5 * 60 * 1000);

      const existingToken = await PasswordResetToken.findOne({
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
          success: true,
          message: 'Your password has been generated.',
        };
      }

      const token = crypto.randomBytes(32).toString('hex');
      const thirtyMinutesFromNow = new Date(now.getTime() + 30 * 60 * 1000);
      const requestIp =
        req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      const requestAgent = req.headers['user-agent'];

      await PasswordResetToken.create({
        token,
        userId: user.id,
        expiratedAt: thirtyMinutesFromNow,
        requestIp,
        requestAgent,
      });

      // Here you would typically send an email with the token.
      // e.g., sendPasswordResetEmail(user.email, token);

      return {
        success: true,
        message: 'Your password has been generated.',
      };
    },

    validatePasswordResetToken: async (_, { token }) => {
      const now = new Date();
      const resetToken = await PasswordResetToken.findOne({
        where: {
          token,
          expiratedAt: {
            [Op.gt]: now,
          },
          usedAt: null,
        },
      });

      return {
        isValid: !!resetToken,
      };
    },

    resetPassword: async (_, { input }) => {
      const { token, password } = input;
      const now = new Date();

      const resetToken = await PasswordResetToken.findOne({
        where: {
          token,
          expiratedAt: {
            [Op.gt]: now,
          },
          usedAt: null,
        },
        include: [User],
      });

      if (!resetToken || !resetToken.user) {
        return {
          success: false,
          message: 'Token is invalid or has expired.',
        };
      }

      const user = resetToken.user;
      await user.changePassword(password);

      resetToken.usedAt = now;
      await resetToken.save();

      return {
        success: true,
        message: 'Password has been reset successfully.',
      };
    },
  },
};
