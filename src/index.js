const express = require('express');
const consign = require('consign');
const path = require('path');

const app = express();

consign({ cwd: path.join(__dirname) })
    .include('libs/config.js')
    .then('db.js')
    .then('auth.js')
    .then('libs/middlewares.js')
    .then('routes')
    .then('libs/boot.js')
    .into(app);

module.exports = app;