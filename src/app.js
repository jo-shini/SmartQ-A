const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const docRoutes = require('./routes/docRoutes');
const askRoutes = require('./routes/askRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(errorHandler);


app.use('/api/docs', docRoutes);
app.use('/api/ask', askRoutes);
app.use('/api/auth', authRoutes);


app.get('/', (req, res) => {
    res.send('API is running...')
});

module.exports = app;