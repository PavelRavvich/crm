const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const morgan = require('morgan');
const mongoose = require('mongoose');
authRoutes = require('./routes/auth');
analytisRoutes = require('./routes/analytic');
categoryRoutes = require('./routes/category');
orderRoutes = require('./routes/order');
positionRoutes = require('./routes/position');
const keys = require('./config/keys');

const app = express();

mongoose.connect(keys.mongoURI)
    .then(() => console.log("Mongo DB connected"))
    .catch(e => console.log(e));



app.use(passport.initialize());
require('./middlware/passport')(passport);

app.use(morgan('dev'));
app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/analytic', analytisRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/position', positionRoutes);

module.exports = app;