const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRouter = require('./routers/auth.router');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/auth', authRouter);

module.exports = app;