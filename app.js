const express = require('express');
const app = express();
const ejs = require('ejs');
const port = process.env.PORT || 3030;
const router = require('./router/router');

const db = require('./db/connection/connect');

app.use('/', router);
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.listen(port, console.log(`http://localhost:${port}`));