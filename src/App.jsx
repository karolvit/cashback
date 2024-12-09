import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Login from "./paginas/Login";
import { ToastContainer } from "react-toastify";
import Home from "./paginas/Home";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { auth, loading } = useAuth();

  console.log(loading);

  if (loading) {
    return <p>Carregando...</p>;
  }
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        <Route path="/home" element={auth ? <Home /> : <Navigate to="/" />} />
        <Route path="/" element={!auth ? <Login /> : <Navigate to="/home" />} />
      </Routes>
    </div>
  );
}

export default App;
