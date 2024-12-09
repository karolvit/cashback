import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store.js";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Login from "./paginas/Login.jsx";
import RegistroUsuario from "./paginas/RegistroUsuario.jsx";
import PesquisaCash from "./paginas/PesquisaCash.jsx";
import Home from "./paginas/Home.jsx";
import { WebSocketProvider } from "./context/WebSocketContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "registro",
        element: <RegistroUsuario />,
      },
      {
        path: "cash",
        element: <PesquisaCash />,
      },
      {
        path: "home",
        element: <Home />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <WebSocketProvider>
        <RouterProvider router={router} />
      </WebSocketProvider>
    </Provider>
  </React.StrictMode>
);
