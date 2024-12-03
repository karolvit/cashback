const pool = require('../database/connection');
const express = require('express')
const router  = require('../routes/routes');
const { crypt } = require('./license');

const route = express()


async function checkDate() {
    const today = new Date();
    const dia = today.getDate();
    const mes = today.getMonth() + 1;
    const ano = today.getFullYear();

    const date = `${ano}-${mes < 10 ? '0' + mes : mes}-${dia < 10 ? '0' + dia : dia}`;

    try {
        const [rows, fields] = await pool.execute(`SELECT DATE_FORMAT(l1, '%Y-%m-%d') as l1 FROM sys WHERE id = 1`);

        const license = rows[0].l1;

        if (license >= date) {
            return router;
        } else {
            return crypt;
        }
    } catch (error) {
        return crypt;
    }
}
module.exports = checkDate;
