const express = require('express');
const { orderCreate } = require('../service/order');

const order = express.Router();

order.post("/create", async (req, res) => {
    const { cpf, recebido, vpoint, bp } = req.body;
    const result = await orderCreate(cpf, recebido, vpoint, bp);

    result.success ? res.status(200).json(result) : res.status(500).json(result)
})

module.exports = order