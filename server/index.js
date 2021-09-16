'use strict';

const express = require('express');
const path = require('path');
const app = express();
const opn = require('opn');

app.use(express.static(path.resolve(__dirname, '..', 'public')));

const port = process.env.PORT || 8000;
app.listen(port, function () {
    console.log(`Server is listening port ${port}`);
    opn('http://localhost:8000/index.html');
});
