import styled, { createGlobalStyle } from "styled-components";

import { useState, useEffect } from "react";
import apiAcai from "../axios/config.js";
import Modal from "react-modal";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;
const NavBar = styled.nav`
  height: 80px;
  margin-top: 5px;
  margin-left: 30px;
  padding: 0px 30px;
  width: 95%;
  background-color: #73287d;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
`;
const Flex = styled.div`
  display: flex;
`;
const ContainerFlex = styled.div`
  height: 100vh;
  background-repeat: no-repeat;
  background-position: center;
`;

const InputPesquisa = styled.input`
  min-width: 25%;
  border-radius: 10px;
  height: 50px;
  padding-left: 10px;

  border: none;
  font-size: 20px;
`;

const InputButao = styled.input`
  min-width: 19%;
  border-radius: 10px;
  height: 50px;
  padding-left: 10px;
  border: none;
  color: #5f387a;
  font-size: 30px;
  font-weight: 800;
  cursor: pointer;
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

const ModalCadastroProduto = styled.div`
  background-color: #73287d;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  gap: 35%;
  align-items: center;
  margin-bottom: 40px;
  width: 100%;

  h2 {
    font-size: 25px;
    color: #f3eef7;
    text-align: center;
    margin-left: 10px;
    font-weight: 900;
    cursor: pointer;
  }
`;
const Form = styled.div`
  display: flex;

  input,
  label {
    margin: 5px 20px;
    height: 25px;
    max-width: 700px;
    color: #73287d;
    font-weight: 700;
    font-size: 20px;
  }
  input {
    height: 45px;
    padding-left: 10px;
    border-radius: 20px;
    border: 1px solid #73287d;
  }
`;
const Form1 = styled.div`
  display: flex;
  flex-direction: column;
`;
const ButaoEnvioUsuario = styled.div`
  display: flex;
  margin-top: 1.5%;
  justify-content: center;
  input {
    background-color: #73287d;
    color: #f3eef7;
    padding: 15px 50px;
    border-radius: 20px;
    font-weight: 700;
    font-size: 20px;
    cursor: pointer;
  }
  input:hover {
    background-color: #8b43bb;
    border: none;
    transition: 1s;
  }
`;
const Paginacao = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;
const PaginacaoBotao = styled.button`
  background-color: #73287d;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    background-color: #d3d3d3;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #8b43bb;
    transition: 0.3s;
  }
`;
const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [tel, setTel] = useState("");
  const [pesquisa, setPesquisa] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(1);

  useEffect(() => {
    const carregarUsuarios = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await apiAcai.get("/client/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Sucesso", res.data.message);
        setUsuarios(res.data.message);
      } catch (error) {
        console.log("Erro", error);
      }
    };
    carregarUsuarios();
  }, []);

  const abrirModal = () => {
    setModalAberto(true);
  };
  const fecharModal = () => {
    setModalAberto(false);
  };

  const cadastrarUsuario = async (e) => {
    e.preventDefault();

    try {
      setEnviando(true);
      const usuarioCadastro = {
        cpf,
        nome,
        tel,
      };
      const res = await apiAcai.post("/client/insert", usuarioCadastro);
      if (res.status === 201) {
        window.location.reload();
        fecharModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePesquisaChange = (e) => {
    setPesquisa(e.target.value);
  };

  const itensPorPagina = 11;
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const indiceFinal = indiceInicial + itensPorPagina;

  const filtroUsuarios = Array.isArray(usuarios)
    ? usuarios.filter(
        (usuario) =>
          usuario.name &&
          usuario.name.toLowerCase().includes(pesquisa.toLowerCase())
      )
    : [];

  const usuariosExibidos = filtroUsuarios.slice(indiceInicial, indiceFinal);

  const totalPaginas = Math.ceil(filtroUsuarios.length / itensPorPagina);

  const mudarPagina = (novaPagina) => {
    if (novaPagina > 0 && novaPagina <= totalPaginas) {
      setPaginaAtual(novaPagina);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Flex>
        <ContainerFlex>
          <NavBar>
            <InputPesquisa
              type="search"
              placeholder="Digite o nome do cliente"
              value={pesquisa}
              onChange={handlePesquisaChange}
            />
            <InputButao type="button" onClick={abrirModal} value="+ Cliente" />
            <Modal
              isOpen={modalAberto}
              onRequestClose={fecharModal}
              contentLabel="Confirmar Pedido"
              style={{
                content: {
                  borderRadius: "15px",
                  maxWidth: "60%",
                  height: "50%",
                  margin: "auto",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  boxShadow: "0 0 10px rgb(0 0 0 / 67%)",
                },
              }}
            >
              <ModalCadastroProduto>
                <h2>Cadastro de Cliente</h2>
              </ModalCadastroProduto>
              <form onSubmit={(e) => cadastrarUsuario(e)}>
                <Form>
                  <Form1>
                    <label>Nome</label>
                    <input
                      type="text"
                      placeholder="Nome do Cliente"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />
                  </Form1>
                  <Form1>
                    <label>CPF</label>
                    <input
                      type="text"
                      placeholder="CPF do cliente"
                      value={cpf}
                      onChange={(e) => setCpf(e.target.value)}
                    />
                  </Form1>
                </Form>
                <Form>
                  <Form1>
                    <label>Telefone</label>
                    <input
                      type="text"
                      placeholder="Telefone do cliente"
                      value={tel}
                      onChange={(e) => setTel(e.target.value)}
                    />
                  </Form1>
                </Form>
                <ButaoEnvioUsuario>
                  {enviando ? (
                    "Aguarde..."
                  ) : (
                    <input
                      type="submit"
                      value="Cadastrar cliente"
                      disabled={enviando}
                    />
                  )}
                </ButaoEnvioUsuario>
              </form>
            </Modal>
          </NavBar>
          <Tabela>
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>Telefone</th>
              </tr>
            </thead>
            <tbody>
              {usuariosExibidos.map((usuario) => (
                <tr key={usuario.cpf}>
                  <td>{usuario.name}</td>
                  <td>{usuario.cpf}</td>
                  <td>{usuario.tel}</td>
                </tr>
              ))}
            </tbody>
          </Tabela>
          <Paginacao>
            <PaginacaoBotao
              onClick={() => mudarPagina(paginaAtual - 1)}
              disabled={paginaAtual === 1}
            >
              Anterior
            </PaginacaoBotao>
            <PaginacaoBotao
              onClick={() => mudarPagina(paginaAtual + 1)}
              disabled={paginaAtual === totalPaginas}
            >
              Próxima
            </PaginacaoBotao>
          </Paginacao>
        </ContainerFlex>
      </Flex>
    </>
  );
};

export default Usuarios;
