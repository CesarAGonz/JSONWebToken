const express = require('express');
const app = express();

app.use(express.json()); //Acept json format
app.use(express.urlencoded({extended: false})); //Recive data from a form and convert into js object

app.use(require('./controllers/authController'));

module.exports = app;