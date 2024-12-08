import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Login from "./paginas/Login";

import Home from "./paginas/Home";

function App() {
  const { auth, loading } = useAuth();

  console.log(loading);

  if (loading) {
    return <p>Carregando...</p>;
  }
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={auth ? <Home /> : <Navigate to="/" />} />
        <Route path="/" element={!auth ? <Login /> : <Navigate to="/home" />} />
      </Routes>
    </div>
  );
}

export default App;
