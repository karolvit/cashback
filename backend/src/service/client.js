const pool = require('../database/connection');
const client = require('../routes/client');

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

async function clientSerach(cpf) {
    try {
        const query = "SELECT * FROM client WHERE cpf = ?";

        const [result] = await pool.query(query, [cpf])
        
        if (!result || result == null, result == 0, result == undefined) {
            return {
                success: false,
                error: ["Não existe cliente cadastrado para o cpf informado"]
            }
        }

        return {
            success: true,
            message: result 
        }
    } catch (error) {
        return {
            success: false,
            error: ["Erro ao buscar cliente, por favor contate o administrador"]
        }
    }
}

module.exports = {
    clientCreate,
    clientList,
    clientSerach
}