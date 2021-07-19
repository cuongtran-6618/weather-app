require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectDB = require('./boostrap/database');

const indexRouter = require('./routes/index');
const weatherRouter = require('./routes/weather');
const errorHandler = require('./middleware/errorHandler');

module.exports = async () => {
    console.log('app called');
    await connectDB();
    const app = express();

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/', indexRouter);
    app.use('/weather', weatherRouter);

    // catch 404 and forward to error handler
    app.use((req, res, next) => {
        next(createError(404));
    });

    // error handler with custom error code in middleware
    app.use(errorHandler);

    return app;
};
