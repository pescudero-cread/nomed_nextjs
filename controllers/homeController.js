const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

// Home page controller
const getHome = (req, res) => {
  const data = {
    title: 'NOMED - Transformando la educación con inteligencia artificial',
    description: 'Soluciones digitales que optimizan el aprendizaje de estudiantes y docentes mediante inteligencia artificial',
    testimonials: [
      {
        name: 'Ana Martínez',
        role: 'Profesora de Matemáticas',
        avatar: 'A',
        quote: 'Botbee ha revolucionado mi manera de enseñar. Los estudiantes están más motivados y el aprendizaje es más interactivo y divertido.'
      },
      {
        name: 'Carlos Rodríguez',
        role: 'Coordinador Académico',
        avatar: 'C',
        quote: 'Monkit nos ha permitido crear contenido educativo de calidad en tiempo récord. Nuestros docentes están encantados con las herramientas.'
      },
      {
        name: 'María González',
        role: 'Estudiante Universitaria',
        avatar: 'M',
        quote: 'La App Nomed me ha ayudado mucho en mis estudios. Las explicaciones son claras y los ejercicios interactivos hacen que aprender sea divertido.'
      }
    ],
    team: [
      {
        name: 'Felipe Robinet',
        role: 'CEO',
        avatar: 'F'
      },
      {
        name: 'Benjamín Mora',
        role: 'CTO',
        avatar: 'B'
      }
    ]
  };
  
  res.render('index', data);
};

// Contact form handler
const postContact = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email, message } = req.body;

    // Create transporter for email
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // Email content
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: 'contacto@nomed.org',
      subject: `Nuevo mensaje de contacto de ${name}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);

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
  getHome,
  postContact
};
