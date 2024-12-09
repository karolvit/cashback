import styled, { createGlobalStyle } from "styled-components";
import logo from "../assets/img/logo.jpg";
import apiAcai from "../axios/config.js";
import { useState } from "react";
import usuario from "../assets/img/user.png";
import Switch from "react-switch";
//import { toast } from "react-toastify";

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

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 70vw;
  justify-content: space-evenly;
  @media screen and (max-width: 900px) {
    height: 1px;
    width: 50vw;
    margin: auto;
  }
`;

const LoginContainer = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 0 10px rgb(0 0 0 / 67%);
  display: flex;
  max-width: 1200px;
  align-items: center;

  img {
    width: 100px;
  }
`;

const LoginForm = styled.div`
  flex: 1;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 900px) {
    padding: 40px;
    position: relative;
  }
  img {
    margin-bottom: 10px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-size: 20px;
    color: #5f387a;
    font-weight: bold;
    margin-bottom: 20px;
  }
`;

const Label = styled.label`
  font-weight: bold;
  color: #5f387a;
  width: 100%;
  margin: 5px 0;
  font-size: 18px;
`;

const Input = styled.input`
  padding-left: 10px;
  background-color: #ffffff;
  border-radius: 10px;
  font-weight: bold;
  width: 100%;
  height: 2.3rem;
  margin: 5px 0;
  border-color: #5f387a;

  &::placeholder {
    color: #5f387a;
    font-weight: normal;
  }
`;

const Button = styled.input`
  width: 100%;
  margin-top: 40px;
  padding: 12px 90px;
  background-color: #73287d;
  border: 1px solid #73287d;
  color: #f1f1f1;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    background-color: #8b43bb;
    border-radius: 50px;
  }
`;

const Message = styled.div`
  margin-top: 20px;
  font-size: 18px;
  color: ${({ success }) => (success ? "green" : "red")};
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
const ButaoEnvioUsuario = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  input {
    width: 100%;
    margin-top: 40px;

    padding: 12px 90px;
    background-color: #73287d;
    border: 1px solid #73287d;
    color: #f1f1f1;
    cursor: pointer;
    transition: 0.5s;
  }
  input:hover {
    background-color: #8b43bb;
    border-radius: 50px;
    transition: 1s;
  }
`;

const PesquisaCash = () => {
  const [cpf, setCpf] = useState("");
  const [name, setName] = useState("");
  const [point, setPoint] = useState("");
  const [recebido, setRecebido] = useState("");
  const [bp, setBp] = useState(0);
  const [message, setMessage] = useState(null);
  const [hasCashback, setHasCashback] = useState(false);
  const [proxComponent, setproxComponent] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [vpoint, setVpoint] = useState("");
  const [enviando, setEnviando] = useState(false);

  const handleSwitchChange = (checked) => {
    setIsChecked(checked);
    setBp(checked ? 1 : 0);
    console.log(bp, "teste");
  };
  const formatCPF = (value) => {
    const numericValue = value.replace(/\D/g, "");
    return numericValue
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
  };

  const formatCashback = (value) => {
    const numericValue = value.replace(/\D/g, "");
    const formattedValue = (parseInt(numericValue) / 100).toFixed(2);
    return formattedValue.replace(".", ".");
  };

  const varificarVpoint = (e) => {
    const value = e.target.value;
    setVpoint(formatCashback(value));
  };

  const varificarVrecebido = (e) => {
    const value = e.target.value;
    setRecebido(formatCashback(value));
  };
  const verificarBp = () => {
    const inativo = parseFloat(bp) === 1;

    return inativo;
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setCpf(formatCPF(value));
  };

  const BotaoPesquisaCPF = async () => {
    try {
      const rawCpf = cpf.replace(/\D/g, "");

      if (!rawCpf || rawCpf.length !== 11) {
        throw new Error("CPF inválido.");
      }

      const encodedCPF = encodeURIComponent(rawCpf);
      const url = `/client/serach?cpf=${encodedCPF}`;
      const res = await apiAcai.get(url);

      setCpf(res.data.message[0].cpf);
      setName(res.data.message[0].name);
      setPoint(res.data.message[0].point);
      console.log("aqui karol", res.data.message[0]);

      if (cpf === cpf) {
        setHasCashback(true);
        setMessage("Parabéns, existe cliente cadastrado com esse CPF");

        setTimeout(() => {
          setproxComponent(true);
        }, 3000);
      } else {
        setHasCashback(false);
        setMessage("Cliente não possui cadastro.");
      }
    } catch (error) {
      setHasCashback(false);
      setMessage("Cliente não possui cadastro.");
      console.error("Erro ao encontrar cliente:", error.message);
    }
  };
  const enviarPedido = async (e) => {
    e.preventDefault();

    try {
      const dadosPedido = {
        cpf,
        recebido,
        vpoint,
        bp,
      };
      setEnviando(true);
      const res = await apiAcai.post("/order/create", dadosPedido);
      if (res.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setEnviando(false);
    }
  };

  if (proxComponent) {
    return (
      <>
        <GlobalStyle />
        <Container>
          <LoginContainer>
            <LoginForm>
              <img src={usuario} alt="" />

              <Form>
                <p>Dados do cliente:</p>

                <Label htmlFor="cpf">CPF</Label>
                <Input
                  type="text"
                  id="cpf"
                  name="cpf"
                  placeholder="Digite o CPF do cliente"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  disabled
                />
              </Form>
              <Form>
                <Label>Nome</Label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled
                />
              </Form>
              <Form>
                <Label>Pontos</Label>
                <Input
                  type="text"
                  value={point}
                  onChange={(e) => setPoint(e.target.value)}
                  disabled
                />
              </Form>
            </LoginForm>
          </LoginContainer>
          <LoginContainer>
            <LoginForm>
              <form onSubmit={(e) => enviarPedido(e)}>
                <Form>
                  <p>Dados do pedido:</p>
                  <Label>Valor do pedido</Label>
                  <Input
                    type="text"
                    name="pedido"
                    placeholder="Valor do pedido do cliente"
                    value={recebido}
                    onChange={varificarVrecebido}
                  />
                </Form>
                <Form>
                  <Label>Cashback utlizado</Label>
                  <Input
                    type="text"
                    name="pedido"
                    placeholder="Valor utilizado pelo cliente"
                    value={vpoint}
                    onChange={varificarVpoint}
                    disabled={!verificarBp()}
                  />
                </Form>
                <Label>Cliente utiliza cashback? </Label>
                <Switch
                  onChange={handleSwitchChange}
                  checked={isChecked}
                  onColor="#46295a"
                  onHandleColor="#593471"
                  handleDiameter={30}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                  activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                  height={20}
                  width={48}
                />

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
            </LoginForm>
          </LoginContainer>
        </Container>
      </>
    );
  }

  return (
    <>
      <GlobalStyle />
      <Container>
        <LoginContainer>
          <LoginForm>
            <img src={logo} alt="Logo" />
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                BotaoPesquisaCPF(cpf);
              }}
            >
              <Label htmlFor="cpf">CPF:</Label>
              <Input
                mask="999.999.999-99"
                type="text"
                id="cpf"
                name="cpf"
                placeholder="Digite o CPF do cliente"
                value={cpf}
                onChange={handleChange}
              />

              <Button type="submit" value="Pesquisar" />
            </Form>

            {message && <Message success={hasCashback}>{message}</Message>}
          </LoginForm>
        </LoginContainer>
      </Container>
    </>
  );
};

export default PesquisaCash;
