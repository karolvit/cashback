import styled, { createGlobalStyle } from "styled-components";
import { useState, useEffect } from "react";
import apiAcai from "../axios/config.js";
import Modal from "react-modal";
import { usuarioSchema } from "../utils/validador.js";
import * as yup from "yup";
import { toast } from "react-toastify";
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

const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #73287d;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [name, setName] = useState("");
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
  const handleChange = (e) => {
    const value = e.target.value;
    setCpf(formatCPF(value));
  };

  const formatCPF = (value) => {
    const numericValue = value.replace(/\D/g, "");
    return numericValue
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
  };
  const formatarCPF = (cpf) => {
    if (!cpf) return "";
    const apenasNumeros = cpf.replace(/\D/g, "");
    return apenasNumeros.replace(
      /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
      "$1.$2.$3-$4"
    );
  };

  const formatarTelefone = (telefone) => {
    if (!telefone) return "";
    const apenasNumeros = telefone.replace(/\D/g, "");
    if (apenasNumeros.length === 10) {
      return apenasNumeros.replace(/(\d{2})(\d{4})(\d{4})/, "($1)$2-$3");
    } else if (apenasNumeros.length === 11) {
      return apenasNumeros.replace(/(\d{2})(\d{5})(\d{4})/, "($1)$2-$3");
    }
    return telefone;
  };

  const cadastrarUsuario = async (e) => {
    e.preventDefault();
    const cpfSemFormatacao = cpf.replace(/\D/g, "");

    const dados = { name, cpf: cpfSemFormatacao, tel };

    setEnviando(true);

    try {
      await usuarioSchema.validate(dados, { abortEarly: false });
      const res = await apiAcai.post("/client/insert", dados);
      if (res.status === 201) {
        window.location.reload();
        fecharModal();
      }
      console.log("Dados válidos:", dados);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        error.inner.forEach((err) => {
          toast.error(err.message);
        });
      }
    } finally {
      setEnviando(false);
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
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form1>
                  <Form1>
                    <label>CPF</label>
                    <input
                      mask="999.999.999-99"
                      type="text"
                      placeholder="CPF do cliente"
                      value={cpf}
                      onChange={handleChange}
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
                    <Spinner />
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
                  <td>{formatarCPF(usuario.cpf)}</td>
                  <td>{formatarTelefone(usuario.tel)}</td>
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
