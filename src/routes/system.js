const express = require('express');
const { getCashBack } = require('../service/system');

const sys = express.Router();

sys.get("/cashback", async (req, res) => {
    const result = await getCashBack();

    result.success ? res.status(200).json(result) : res.status(500).json(result);
})

module.exports = sys;