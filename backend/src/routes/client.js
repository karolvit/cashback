const express = require('express');
const { clientCreate, clientList } = require('../service/client');
const { pool } = require('../database/connection');
const client = express.Router();

client.post("/insert", async (req, res) => {
    const {cpf, name, tel} = req.body;

    const result = await clientCreate(cpf, name, tel);

    result.success ? res.status(200).json(result) : res.status(500).json(result);
});

client.get("/all", async (req, res) => {
    const result = await clientList();

    result.success ? res.status(200).json(result) : res.status(500).json(result);
});

client.get("/serach", async (req, res) => {
    const {cpf} = req.query;

    const result = await pool.query(cpf)

    result.success ? res.status(200).json(result) : res.status(500).json(result)
})

module.exports = client 