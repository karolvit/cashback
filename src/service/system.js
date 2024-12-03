const pool = require('../database/connection');

async function getCashBack() {
    const query = "SELECT value as porcentagem FROM sys WHERE id = 2";
    const [result] = await pool.query(query);

    return {
        success: true,
        message: result
    }
}

module.exports = {
    getCashBack
}