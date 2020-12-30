const express = require('express');
const consign = require('consign');
const path = require('path');

const PORT = 3000;
const app = express();

app.set('json spaces', 4);

consign({ cwd: path.join(__dirname) })
    .include('models')
    .then('libs/middlewares.js')
    .then('routes')
    .then('libs/boot.js')
    .into(app);