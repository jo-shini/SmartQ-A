const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const docRoutes = require('./routes/docRoutes');
const askRoutes = require('./routes/askRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.use('/api/docs', docRoutes);
app.use('/api/ask', askRoutes);


app.get('/', (req, res) => {
    res.send('API is running...')
});

module.exports = app;