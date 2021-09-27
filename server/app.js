var express = require('express');
var cors = require('cors');
var logger = require('morgan');

var corsOptions = {
  origin: 'http://localhost:4200',
};

var app = express();

var routes = require('./routes');

app.use(logger('dev'));

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  setTimeout(next, 1000);
});

app.use('/api', routes);

module.exports = app;
