// Production configuration for NOMED
module.exports = {
    // Server configuration
    server: {
        port: process.env.PORT || 3000,
        host: process.env.HOST || '0.0.0.0',
        environment: 'production'
    },
    
    // Database configuration
    database: {
        uri: process.env.MONGODB_URI,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: 20,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            bufferMaxEntries: 0,
            bufferCommands: false
        }
    },
    
    // Email configuration
    email: {
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
    },
    
    // Security configuration
    security: {
        jwt: {
            secret: process.env.JWT_SECRET,
            expiresIn: process.env.JWT_EXPIRES_IN || '7d'
        },
        bcrypt: {
            saltRounds: 12
        },
        rateLimit: {
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 50, // More restrictive in production
            message: 'Too many requests from this IP, please try again later.'
        }
    },
    
    // CORS configuration
    cors: {
        origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['https://nomed.org'],
        credentials: true,
        optionsSuccessStatus: 200
    },
    
    // Logging configuration
    logging: {
        level: 'warn',
        format: 'combined'
    },
    
    // Performance configuration
    performance: {
        compression: {
            enabled: true,
            level: 9,
            threshold: 1024
        },
        static: {
            maxAge: '1y'
        }
    },
    
    // Feature flags
    features: {
        emailNotifications: true,
        analytics: true,
        debugMode: false
    },
    
    // API configuration
    api: {
        version: 'v1',
        prefix: '/api',
        timeout: 30000,
        retries: 3
    },
    
    // Botbee configuration
    botbee: {
        maxMessageLength: 500,
        responseDelay: {
            min: 1000,
            max: 3000
        },
        personality: {
            enthusiasm: 0.8,
            helpfulness: 0.9,
            friendliness: 0.85
        }
    },
    
    // Monkit configuration
    monkit: {
        maxContentLength: 2000,
        supportedTypes: ['lesson', 'quiz', 'activity', 'presentation'],
        generationDelay: {
            min: 2000,
            max: 5000
        }
    },
    
    // Quizzal configuration
    quizzal: {
        maxQuestions: 50,
        timeLimit: 3600, // 1 hour in seconds
        passingScore: 70
    }
};
