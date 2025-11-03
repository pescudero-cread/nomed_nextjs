const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

// Send contact message
const sendMessage = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email, message, subject } = req.body;

    // Create transporter for email (with fallback for development)
    let transporter;
    
    if (process.env.NODE_ENV === 'production' && process.env.SMTP_HOST) {
      transporter = nodemailer.createTransporter({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
    } else {
      // Development fallback - just log the message
      console.log('📧 Contact Form Submission (Development Mode):');
      console.log(`Name: ${name}`);
      console.log(`Email: ${email}`);
      console.log(`Subject: ${subject || 'Sin asunto'}`);
      console.log(`Message: ${message}`);
      
      return res.json({
        success: true,
        message: 'Mensaje recibido correctamente. Te contactaremos pronto.',
        development: true
      });
    }

    // Email content
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: 'contacto@nomed.org',
      subject: `Nuevo mensaje de contacto de ${name}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Asunto:</strong> ${subject || 'Sin asunto'}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
        <hr>
        <p><em>Enviado desde el formulario de contacto de NOMED</em></p>
      `
    };

    await transporter.sendMail(mailOptions);

    // Send confirmation email to user
    const confirmationOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Confirmación de mensaje - NOMED',
      html: `
        <h2>¡Gracias por contactarnos!</h2>
        <p>Hola ${name},</p>
        <p>Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.</p>
        <p><strong>Tu mensaje:</strong></p>
        <p>${message}</p>
        <hr>
        <p>Equipo NOMED</p>
      `
    };

    await transporter.sendMail(confirmationOptions);

    res.json({
      success: true,
      message: 'Mensaje enviado correctamente. Te contactaremos pronto.'
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor. Inténtalo de nuevo más tarde.'
    });
  }
};

module.exports = {
  sendMessage
};
