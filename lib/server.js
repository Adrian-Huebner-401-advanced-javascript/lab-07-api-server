'use strict';

const express = require('express');

const app = express();

let db = [];

app.use(express.json());

// Middleware
function Logger(message){
  return function requestTime(req, res, next){
    req.date = Date.now();
    console.log(`${req.path} ${req.method} ${req.date} ${message}`);
    next();
  };
}

const errorHandler = (status) => (req,res) => res.status(status).send('404 Error Found');

const secErrorHandler = (status) => (req,res) => res.status(status).send('500 Error Found');

function randBoolean (req, res, next){
  req.valid = Boolean(Math.round(Math.random()));
  next();
}

// Route to Get All Categories
app.get('/categories', Logger('Here is my GET message'), randBoolean, (req, res, next) => {
  let count = db.length;
  let results = db;
  res.json({ count, results });
});

// Route to Create a Category
app.post('/categories', Logger('Here is my POST message'), randBoolean, (req, res, next) => {
  let record = req.body;
  record.id = Math.random();
  db.push(record);
  res.json(record);
});

// 
app.use(secErrorHandler(500));
app.use(errorHandler(404));

module.exports = {
  app,
  start: (PORT) => {
    app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`);
    });
  },
};