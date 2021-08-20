const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utility/AppError');

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/v1/users', userRouter);

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
