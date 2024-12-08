module.exports = (ws) => {
    console.log('Novo cliente WebSocket conectado');
  
    ws.send(JSON.stringify({ message: 'Bem-vindo ao WebSocket!' }));
  
    ws.on('Successfully connected', (message) => {
      console.log('Mensagem recebida:', message);
      ws.send(`Você disse: ${message}`);
    });
  
    ws.on('close', () => {
      console.log('Cliente desconectado');
    });
  
    ws.on('error', (error) => {
      console.log('Erro WebSocket:', error);
    });
  };
  