const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
authRoutes = require('./routes/auth');
analytisRoutes = require('./routes/analytic');
categoryRoutes = require('./routes/category');
orderRoutes = require('./routes/order');
positionRoutes = require('./routes/position');
const keys = require('./config/keys');

const app = express();

// DB connection.
mongoose.connect(keys.mongoURI)
    .then(() => console.log("Mongo DB connected"))
    .catch(e => console.log(e));


// Auth pref.
app.use(passport.initialize());
require('./middlware/passport')(passport);

app.use(morgan('dev'));
app.use(cors());

// Image folder to static.
app.use('/uploads', express.static('uploads'));

// Body parsing.
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Rotes definition.
app.use('/api/auth', authRoutes);
app.use('/api/analytic', analytisRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/position', positionRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist/client/index.html'));
    app.use(express.static('client/dist/client/favicon.ico'));

    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(__dirname, 'client', 'dist', 'client', 'index.html')
        );
    });
}

module.exports = app;