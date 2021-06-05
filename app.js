const express = require('express');
const app = express();

const port = process.env.PORT || 3030;
const router = require('./router/router');

const db = require('./db/connection/connect');

app.listen(port, console.log(`http://localhost:${port}`));