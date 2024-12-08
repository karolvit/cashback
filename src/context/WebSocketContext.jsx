import { createContext, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
export const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://server.celebreprojetos.com.br:65530");

    ws.current.onopen = () => {
      console.log("Conexão WebSocket estabelecida");
    };

    ws.current.onmessage = (event) => {
      console.log("Mensagem recebida:", event.data);
      setMessages((prev) => [...prev, event.data]);
    };

    ws.current.onerror = (error) => {
      console.error("Erro no WebSocket:", error);
    };

    ws.current.onclose = () => {
      console.log("Conexão WebSocket foi fechada");
    };

    return () => {
      ws.current.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ messages, ws: ws.current }}>
      {children}
    </WebSocketContext.Provider>
  );
};

WebSocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
