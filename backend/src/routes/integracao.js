const express = require('express');

const wpp = express.Router();

wpp.post('/send-message', async (req, res) => {
    const { number, message } = req.body;
  
    if (!number || !message) {
      return res.status(400).json({ error: 'Número e mensagem são obrigatórios!' });
    }
  
    const client = getVenomClient();
    if (!client) {
      return res.status(500).json({ error: 'Venom Bot ainda não está inicializado!' });
    }
    try {
      const result = await client.sendText(`${number}@c.us`, message);
      res.status(200).json({ success: true, result });
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

module.exports = wpp