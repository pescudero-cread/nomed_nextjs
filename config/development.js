// Development configuration for NOMED
module.exports = {
    // Server configuration
    server: {
        port: process.env.PORT || 3000,
        host: process.env.HOST || 'localhost',
        environment: process.env.NODE_ENV || 'development'
    },
    
    // Database configuration
    database: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/nomed-dev',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        }
    },
    
    // Email configuration
    email: {
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
    },
    
    // Security configuration
    security: {
        jwt: {
            secret: process.env.JWT_SECRET || 'dev-secret-key-change-in-production',
            expiresIn: process.env.JWT_EXPIRES_IN || '7d'
        },
        bcrypt: {
            saltRounds: 12
        },
        rateLimit: {
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100, // limit each IP to 100 requests per windowMs
            message: 'Too many requests from this IP, please try again later.'
        }
    },
    
    // CORS configuration
    cors: {
        origin: process.env.CORS_ORIGIN || ['http://localhost:3000', 'http://127.0.0.1:3000'],
        credentials: true,
        optionsSuccessStatus: 200
    },
    
    // Logging configuration
    logging: {
        level: process.env.LOG_LEVEL || 'info',
        format: process.env.NODE_ENV === 'production' ? 'combined' : 'dev'
    },
    
    // Performance configuration
    performance: {
        compression: {
            enabled: true,
            level: 6,
            threshold: 1024
        },
        static: {
            maxAge: process.env.NODE_ENV === 'production' ? '1y' : '0'
        }
    },
    
    // Feature flags
    features: {
        emailNotifications: process.env.EMAIL_NOTIFICATIONS === 'true',
        analytics: process.env.ANALYTICS === 'true',
        debugMode: process.env.DEBUG === 'true'
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
