const express = require('express');

const { loginUser, registerUser } = require('../service/auth');

const auth = express.Router();

auth.post("/login", async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({ success: false, errors: ["Preencha os campos usuário e senha"] });
    }

    const { usuario, senha } = req.body;

    if (!usuario || !senha) {
      return res.status(400).json({ success: false, errors: ["Missing 'usuario' or 'senha' in request body"] });
    }

    const result = await loginUser(usuario, senha);
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(401).json(result);
    }
  } catch (error) {
    res.status(500).json({ success: false, errors: ["Erro no servidor"], details: error });
    next(new Error(`Erro ao fazer login ${error}`));
  }
});

auth.post("/register", async (req, res, next) => {
    try {
      const userData = req.body;
      const result = await registerUser(userData);
      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(500).json(result);
      }
    } catch (error) {
      res.status(500).json({ success: false, error: "Erro interno do servidor", details: error });
      const err = error;
      next(new Error(`Erro ao cadastrar usuário, ${err}`))
    }
});

module.exports = auth