const express = require('express');
const { getCashBack, updateCashBack } = require('../service/system');

const sys = express.Router();

sys.get("/cashback", async (req, res) => {
    const result = await getCashBack();

    result.success ? res.status(200).json(result) : res.status(500).json(result);
})

sys.put("/update/cashback", async (req, res) => {
    const {valor} = req.body;

    const result = await updateCashBack(valor);

    result.success ? res.status(200).json(result) : res.status(500).json(result);
})

module.exports = sys;