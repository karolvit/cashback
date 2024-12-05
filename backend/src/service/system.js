const pool = require('../database/connection');

async function getCashBack() {
    const query = "SELECT value as porcentagem FROM sys WHERE id = 2";
    const [result] = await pool.query(query);

    return {
        success: true,
        message: result
    }
}

async function updateCashBack(valor) {
    const query = "UPDATE sys SET value = ? WHERE id = 2";
    const [result] = await pool.query(query, [valor]);

    return {
        success: true,
        message: ["Porcentagem do CashBack alterada com sucesso"]
    }
}

module.exports = {
    getCashBack,
    updateCashBack
}