const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const { mongoDB } = require("./database/connect/mongo-db");
mongoDB();

const { swaggerUi, specs } = require("./swagger/swagger");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const eventsRouter = require('./routes/events');

const app = express();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MONITO API',
      version: '1.0.0',
      description: '모니또 API 명세서',
    },
  },
  apis: ['./routes/**/*.js'],
};

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(cors({ origin: process.env.CLIENT_URL })); //클라이언트 도메인 허용
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/events', eventsRouter);

//5초 타임아웃 설정
app.use(function(req, res, next) {
  res.setTimeout(5000, () => {
    console.log('Request timed out.');
    res.status(408).send('Request timed out')
  });
  next()
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;