const pool = require('../database/connection');

async function orderCreate(cpf, recebido) {
    const QClient = "SELECT id FROM client WHERE cpf = ?";
    const [qclient] = await pool.query(QClient, [cpf]);
    
    if (qclient.length === 0 || !qclient) {
        return {
            success: false,
            error: ["cliente não encontrado"]
        }
    }

    const clientId = qclient[0].id;

    const QPCB = "SELECT value FROM sys WHERE id = 2";
    const [qpbc] = await pool.query(QPCB);
    const porcentagem_cashback = qpbc[0].value;

    const QCreateOrder = "INSERT INTO purchases (id_client, value_pay, point, date, time) VALUES (?, ?, ?, current_date, current_time)"
    const point = (porcentagem_cashback / 100) * recebido;
    const values = [clientId, recebido, point];

    const result = await pool.query(QCreateOrder, values);

    return {
        success: true,
        message: ["Pedido inserido com sucesso"]
    }

}

module.exports = {
    orderCreate
}