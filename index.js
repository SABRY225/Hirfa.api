const express = require('express');
const connectDB = require('./config/db');
const swaggerSpec = require('./config/swaggerConfig');
const jwt = require('jsonwebtoken');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

const { app, server } = require('./config/socket');
const allowedOrigins = [process.env.PORT2, process.env.PORT3];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ['Content-Type', 'Authorization'],
};
require('dotenv').config();
app.use(express.json());
app.use(cors());
// Connect Database
connectDB();

// Middleware
app.use(express.json({ extended: false }));

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.get('/', (req, res) => {
    res.send('Server is running');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
