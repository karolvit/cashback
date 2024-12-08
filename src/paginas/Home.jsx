import SideBar from "../componentes/SideBar";
//import { useContext } from "react";
import styled, { createGlobalStyle } from "styled-components";
import PesquisaCash from "./PesquisaCash";
import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import RegistroUsuario from "./RegistroUsuario";
import Parametros from "./parametros";
//import { WebSocketContext } from "../context/WebSocketContext";
//import QRCode from "react-qr-code";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const Flex = styled.div`
  display: flex;
`;

// const MessagesContainer = styled.div`
//   padding: 10px;
//   border-top: 1px solid #ccc;
// `;

const Fundo = styled.div``;

const variants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
};

const Home = () => {
  const [ativarComponente, setAtivarComponente] = useState("PesquisaCash");
  //const { messages } = useContext(WebSocketContext);

  const cliqueMenu = (componenteNome) => {
    setAtivarComponente(componenteNome);
  };

  const renderizaComponente = () => {
    switch (ativarComponente) {
      case "PesquisaCash":
        return <PesquisaCash />;
      case "Clientes":
        return <RegistroUsuario />;
      case "Parametros":
        return <Parametros />;
      default:
        return <h1>Bem-vindo! Selecione uma opção no menu.</h1>;
    }
  };

  return (
    <>
      <GlobalStyle />
      <Flex>
        <SideBar onMenuClick={cliqueMenu}></SideBar>
        <Fundo>
          <AnimatePresence mode="wait">
            <motion.div
              key={ativarComponente}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              {renderizaComponente()}
            </motion.div>
          </AnimatePresence>
        </Fundo>
      </Flex>
    </>
  );
};

export default Home;
