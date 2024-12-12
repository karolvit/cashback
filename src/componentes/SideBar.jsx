import styled, { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import logo from "../assets/img/logo.jpg";
import compra from "../assets/img/comprar-online.png";
//import relatorio from "../assets/img/relatorio.png";
import cliente from "../assets/img/cliente.png";
import sair from "../assets/img/sair.png";
import configuracao from "../assets/img/configuracao.png";
import { logout, reset } from "../slices/authSlice";
import { useDispatch } from "react-redux";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const FlexContainer = styled.div`
  display: flex;
`;

const SideBarClass = styled.div`
  min-height: 100vh;
  min-width: 250px;
  background-color: #73287d;
  color: #fff;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Container1 = styled.div`
  line-height: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const LogoImage = styled.img`
  width: 135px;
  height: 135px;
  border-radius: 50px;
  margin-bottom: 10px;
`;

const Title = styled.h1`
  font-size: 20px;
`;

const Subtitle = styled.h2`
  font-size: 16px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const SmallImage = styled.img`
  width: 65px;
  height: 65px;
  cursor: pointer;
`;
const Paragraph = styled.p`
  font-size: 21px;
`;

const MainContainer = styled.div`
  opacity: 0.5;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  width: 80%;
`;
const Footer = styled.div`
  margin-top: 20px;
`;

const SideBar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const botaoLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate("/");
  };

  return (
    <>
      <GlobalStyle />
      <FlexContainer>
        <SideBarClass>
          <Container1>
            <LogoImage src={logo} alt="" />
            <Title></Title>
            <Subtitle></Subtitle>
          </Container1>
          <Container2>
            <>
              <Box onClick={() => onMenuClick("PesquisaCash")}>
                <SmallImage src={compra} alt="" />
                <Paragraph>Inserir pedido</Paragraph>
              </Box>
              {/* <Box onClick={() => onMenuClick("Relatorio")}>
                <SmallImage src={relatorio} alt="" />
                <Paragraph> Relatorio</Paragraph>
              </Box> */}
              <Box onClick={() => onMenuClick("Clientes")}>
                <SmallImage src={cliente} alt="" />
                <Paragraph>Clientes</Paragraph>
              </Box>
              <Box onClick={() => onMenuClick("Parametros")}>
                <SmallImage src={configuracao} alt="" />
                <Paragraph> Parametros</Paragraph>
              </Box>
              <Box onClick={botaoLogout}>
                <SmallImage src={sair} alt="" />
                <Paragraph> Sair</Paragraph>
              </Box>
            </>
          </Container2>
          <Footer>
            <p>Versão 1.0.1</p>
          </Footer>
        </SideBarClass>
        <MainContainer></MainContainer>
      </FlexContainer>
    </>
  );
};
SideBar.propTypes = {
  onMenuClick: PropTypes.func.isRequired,
};

export default SideBar;
