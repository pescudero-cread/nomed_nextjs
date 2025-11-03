const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido']
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  subject: {
    type: String,
    trim: true,
    maxlength: 200
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied', 'closed'],
    default: 'new'
  },
  ip: {
    type: String,
    trim: true
  },
  userAgent: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Índices para optimizar consultas
contactSchema.index({ email: 1 });
contactSchema.index({ status: 1 });
contactSchema.index({ createdAt: -1 });

// Middleware pre-save
contactSchema.pre('save', function(next) {
  // Limpiar y validar datos antes de guardar
  this.name = this.name.trim();
  this.message = this.message.trim();
  next();
});

// Método para marcar como leído
contactSchema.methods.markAsRead = function() {
  this.status = 'read';
  return this.save();
};

// Método para marcar como respondido
contactSchema.methods.markAsReplied = function() {
  this.status = 'replied';
  return this.save();
};

module.exports = mongoose.model('Contact', contactSchema);
