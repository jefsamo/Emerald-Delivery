const express = require('express');
const morgan = require('morgan');

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/api/v1/users', (req, res) => {
  res.json({
    status: 'success',
    message: 'Welcome to Emerald delivery API',
  });
});

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

module.exports = app;
