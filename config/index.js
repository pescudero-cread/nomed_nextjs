// Main configuration file for NOMED
const development = require('./development');
const production = require('./production');

const environment = process.env.NODE_ENV || 'development';

const config = environment === 'production' ? production : development;

// Add environment-specific overrides
config.environment = environment;

// Add common utilities
config.utils = {
    isDevelopment: () => environment === 'development',
    isProduction: () => environment === 'production',
    isTest: () => environment === 'test',
    
    getDatabaseUri: () => {
        if (environment === 'production') {
            return process.env.MONGODB_URI;
        }
        return process.env.MONGODB_URI || 'mongodb://localhost:27017/nomed-dev';
    },
    
    getEmailConfig: () => {
        if (environment === 'production') {
            return {
                enabled: true,
                smtp: {
                    host: process.env.SMTP_HOST,
                    port: parseInt(process.env.SMTP_PORT) || 587,
                    secure: process.env.SMTP_SECURE === 'true',
                    auth: {
                        user: process.env.SMTP_USER,
                        pass: process.env.SMTP_PASS
                    }
                },
                from: process.env.SMTP_FROM || 'noreply@nomed.org',
                to: process.env.CONTACT_EMAIL || 'contacto@nomed.org'
            };
        }
        
        return {
            enabled: process.env.EMAIL_ENABLED === 'true',
            smtp: {
                host: process.env.SMTP_HOST || 'smtp.gmail.com',
                port: process.env.SMTP_PORT || 587,
                secure: process.env.SMTP_SECURE === 'true',
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                }
            },
            from: process.env.SMTP_FROM || 'noreply@nomed.org',
            to: process.env.CONTACT_EMAIL || 'contacto@nomed.org'
        };
    }
};

module.exports = config;
