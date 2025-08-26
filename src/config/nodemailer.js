import nodemailer from 'nodemailer';

// SMTP Configuration using environment variables
// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10),
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // Set to false for development or if you have certificate issues
    minVersion: 'TLSv1.2',
  },
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Nodemailer transporter verification failed:', error);
  } else {
    console.log('Nodemailer transporter is ready to send emails');
  }
});

/**
 * Send email using Nodemailer
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Plain text content
 * @param {string} options.html - HTML content (optional)
 * @param {Array} [options.attachments] - File attachments (optional)
 * @returns {Promise<Object>} - Send result
 */
export const sendEmail = async (options) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
      attachments: options.attachments || [],
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return {
      success: true,
      messageId: result.messageId,
      message: 'Email sent successfully',
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: error.message,
      message: 'Failed to send email',
    };
  }
};

/**
 * Send password reset email
 * @param {string} to - Recipient email address
 * @param {string} token - Password reset token
 * @param {string} resetUrl - Password reset URL
 * @returns {Promise<Object>} - Send result
 */
export const sendPasswordResetEmail = async (to, token, resetUrl) => {
  const subject = 'Solicitud de Restablecimiento de Contraseña';
  const text = `Has solicitado restablecer tu contraseña. Por favor, haz clic en el siguiente enlace para restablecer tu contraseña: ${resetUrl}?token=${token}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Solicitud de Restablecimiento de Contraseña</h2>
      <p>Has solicitado restablecer la contraseña de tu cuenta.</p>
      <p>Por favor, haz clic en el botón de abajo para restablecer tu contraseña:</p>
      <a href="${resetUrl}?token=${token}" 
         style="display: inline-block; background-color: #dc2c1e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 20px 0;">
        Restablecer Contraseña
      </a>
      <p>Si el botón no funciona, puedes copiar y pegar este enlace en tu navegador:</p>
      <p style="word-break: break-all; color: #666;">${resetUrl}?token=${token}</p>
      <p>Este enlace expirará en 30 minutos.</p>
      <p>Si no solicitaste este restablecimiento de contraseña, por favor ignora este email.</p>
    </div>
  `;

  return await sendEmail({
    to,
    subject,
    text,
    html,
  });
};

export default transporter;
