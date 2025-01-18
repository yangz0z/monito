#!/usr/bin/env node

import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import { mongoDB } from './database/connect/mongo-db.js';
import { swaggerUi, specs } from './swagger/swagger.js';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import eventsRouter from './routes/events.js';
import cardsRouter from './routes/cards.js';

// dotenv 설정
dotenv.config();

// MongoDB 연결
mongoDB();

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(cors({ origin: process.env.CLIENT_URL })); // 클라이언트 도메인 허용
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/events', eventsRouter);
app.use('/api/cards', cardsRouter);

// 5초 타임아웃 설정
app.use(function(req, res, next) {
  res.setTimeout(5000, () => {
    console.log('Request timed out.');
    res.status(408).send('Request timed out');
  });
  next();
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

export default app;  // `module.exports = app`를 `export default app`으로 변경
