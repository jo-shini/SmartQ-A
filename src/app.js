const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const docRoutes = require('./routes/docRoutes');


const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.use('/api/docs', docRoutes);

app.get('/', (req, res) => {
    res.send('API is running...')
});

module.exports = app;