import styled, { createGlobalStyle } from "styled-components";
import { useState, useEffect } from "react";
import apiAcai from "../axios/config.js";
import { FaPenToSquare } from "react-icons/fa6";
import Modal from "react-modal";
import SetaFechar from "../componentes/SetaVoltar.jsx";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Josefin Sans', serif;
    margin: 0;
    padding: 0;
    @media screen and (max-width: 900px) {
      background: #fff;
    }
  }
`;

const Tabela = styled.table`
  width: 95%;
  border-collapse: collapse;
  border: none;
  table-layout: fixed;
  margin: auto;
  margin-top: 70px;

  th,
  td {
    border: none;
    padding: 8px;
    text-align: center;
  }
  td {
    border-bottom: 2px solid #9582a1;
    color: #73287d;
    font-weight: 900;
    font-size: 20px;
  }
  th {
    background-color: #73287d;
    color: #fff;
  }
  td img {
    margin-top: 10px;
    width: 35%;
  }
`;
const IconeEditavel = styled(FaPenToSquare)`
  cursor: pointer;
`;

const ModalMensagem = styled.div`
  background-color: #46295a;
  height: 40px;
  flex-direction: column;
  width: 100%;
  display: flex;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
  justify-content: space-between;
  gap: 30%;

  @media (max-width: 900px) {
    font-size: 10px;
  }
`;
const ModalInfo = styled.div`
  padding: 0 70px;
  display: flex;
  margin-top: 15px;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #46295a;
  font-weight: 800;

  @media (max-width: 900px) {
    font-size: 15px;
  }

  input {
    width: 50%;
    border: 1px solid #46295a;
    height: 29px;

    padding-left: 10px;
    border-radius: 20px;
    margin-left: 10px;
    margin-right: 10px;
  }
`;

const BotaoAdd = styled.input`
  background-color: #46295a;
  cursor: pointer;
  color: #fff;
  border: none;
  height: 29px;
  width: 170px;
`;
const Parametros = () => {
  const [porcentagem, setPorcentagem] = useState([]);
  const [valor, setValor] = useState([]);
  const [modalPercetual, setModalPercetual] = useState("");

  const abrirModalPercetual = () => {
    setModalPercetual(true);
  };
  const fecharModalPercetual = () => {
    setModalPercetual(false);
  };
  useEffect(() => {
    const carregarUsuarios = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await apiAcai.get("system/params/cashback", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Sucesso", res.data.message[0].porcentagem);
        setPorcentagem(res.data.message[0].porcentagem);
      } catch (error) {
        console.log("Erro", error);
      }
    };
    carregarUsuarios();
  }, []);

  const alterandoPercentual = async (e) => {
    e.preventDefault();
    try {
      const valoresAlterados = {
        valor,
      };
      const res = await apiAcai.put(
        "/system/params/update/cashback",
        valoresAlterados
      );

      if (res.status === 200) {
        console.log(res.data);

        //toast.success(res.data.message[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <GlobalStyle />
      <Tabela>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Parâmetro</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Percentual do cashback</td>
            <td>{porcentagem}</td>
            <td>
              <p>
                <IconeEditavel
                  color="#46295a"
                  onClick={() => abrirModalPercetual(porcentagem)}
                />
              </p>
              <Modal
                isOpen={modalPercetual}
                onRequestClose={fecharModalPercetual}
                contentLabel="Modal Preço"
                style={{
                  content: {
                    width: "60%",
                    height: "20%",
                    margin: "auto",
                    padding: 0,
                  },
                }}
              >
                <ModalMensagem>
                  <SetaFechar Click={fecharModalPercetual} />
                  <ModalInfo>
                    <label>Porcertagem</label>
                    <input
                      type="number"
                      onChange={(e) => {
                        setValor(e.target.value);
                      }}
                      value={valor || ""}
                    />
                    <BotaoAdd
                      type="button"
                      value="Atualizar estoque max"
                      onClick={(e) => {
                        alterandoPercentual(e);
                      }}
                    />
                  </ModalInfo>
                </ModalMensagem>
              </Modal>
            </td>
          </tr>
        </tbody>
      </Tabela>
    </>
  );
};

export default Parametros;
