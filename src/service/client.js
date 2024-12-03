const pool = require('../database/connection');

async function clientCreate(cpf, name, tel) {
    const query = "INSERT INTO client (cpf, name, tel, point) VALUES (?, ?, ?, 0)";

    try {
        const result = await pool.query(query, [cpf, name, tel]);

        return {
            success: true,
            message: ["Cliente criado com sucesso"],
        };
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return {
                success: false,
                message: ["Cliente já cadastrado"],
            };
        }

        throw error;
    }
}


async function clientList() {
    const query = "SELECT * FROM client";   

    const [result] = await pool.query(query);

    if (result.length === 0) {
        return {
            success: true,
            message: ["Nenhum cliente encontrado"]
        }
    }

    return {
        success: true,
        message: result
    }
}

module.exports = {
    clientCreate,
    clientList
}