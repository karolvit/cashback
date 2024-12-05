const pool = require('../database/connection');

async function orderCreate(cpf, recebido, vpoint, bp) {
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

    let point = 0
    bp === 1 ? point = 0 : point = (porcentagem_cashback / 100) * recebido;

    const SDMIN = "SELECT value FROM sys WHERE id = 3";
    const [sdmin] = await pool.query(SDMIN);
    const saldo_minimo = sdmin[0].value;

    if (pontos_cliente < saldo_minimo) {
        return {
            success: false,
            error: [`Para o cliente só pode utilizar o saldo de cashback a partir de ${saldo_minimo}`]
        }
    }

    const PC = "SELECT point as pontos_cliente FROM client WHERE id = ?";
    const [pc] = await pool.query(PC, [clientId]);
    const pontos_cliente = pc[0].pontos_cliente;
    
    if (pontos_cliente > vpoint) {
        return {
            success: false,
            error: ["Saldo CashBack insuficiente"]
        }
    }

    const QCreateOrder = "INSERT INTO purchases (id_client, value_pay, point, date, time, vpoint, bp) VALUES (?, ?, ?, current_date, current_time, ?, ?)"
    
    const values = [clientId, recebido, point, vpoint, bp];

    const result = await pool.query(QCreateOrder, values);

    return {
        success: true,
        message: ["Pedido inserido com sucesso"]
    }

}

module.exports = {
    orderCreate
}