const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT
const usersRouter = require('./routes/users');
const employeesRouter = require('./routes/employees');
const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



app.use('/api/user', usersRouter);
app.use('/api/employees', employeesRouter);
module.exports = app;
