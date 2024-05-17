const cors = require('cors');
const express = require('express');
const path = require('path');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const connectDB = require('./config/database');
const router = require('./routes/index');
const { required } = require('joi');

const PORT = process.env.PORT || 3000;
const app = express();
const rateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
})

app.use(express.json());
app.use(express.static('public'));

const corsOptions = {
    origin: '*', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specific methods
    allowedHeaders: '*', // Allow specific headers
  };
  
  app.use(cors(corsOptions));

// Database Connection
connectDB();

// Default Template Engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Routes
app.use('/', router);
app.use('/api', rateLimiter);

app.listen(PORT, () => {
    console.log(`App Running at Port ${PORT}`);
});
