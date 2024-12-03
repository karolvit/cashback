const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const crypt = require('./config/crypt');

const main = express();

main.use(bodyParser.json());
main.use(cors());
main.use(crypt)
main.use(bodyParser.urlencoded({ extended: true }));

module.exports = main