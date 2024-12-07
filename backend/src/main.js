const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const router = require('./routes/routes');

const main = express();

main.use(bodyParser.json());
main.use(cors());
main.use(bodyParser.urlencoded({ extended: true }));
main.use(router)

module.exports = main