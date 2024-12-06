const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { initializeVenom } = require('./src/utils/wpp/conf');
const dotenv = require('dotenv').config();

const app = express();
const server = http.createServer(app);
const port = process.env.SERVER_PORT || 3000;

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Novo cliente WebSocket conectado');
    
    if (!global.wsClients) {
        global.wsClients = [];
    }
    global.wsClients.push(ws);

    if (global.qrCode) {
        ws.send(JSON.stringify({ event: 'qrCodeGenerated', qrCode }));
    }

    ws.on('close', () => {
        console.log('Cliente WebSocket desconectado');
        global.wsClients = global.wsClients.filter(client => client !== ws);
    });
});

server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
    initializeVenom()
        .then((client) => {
            console.log('Venom bot iniciado');
            global.wsClients.forEach(client => {
                client.send(JSON.stringify({ message: "Whatsapp vinculado com sucesso"}))
            })
        })
        .catch((error) => {
            console.error('Erro ao iniciar Venom Bot:', error);
        });
});
