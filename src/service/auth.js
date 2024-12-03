const pool = require('../database/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config()

const jwtSecret = process.env.JWT_SECRET;

async function loginUser(usuario, senha) {
    try {
      const query = `
        SELECT 
          id, 
          UPPER(nome) AS nome, 
          user, 
          senha
        FROM user
        WHERE user = ?
      `;
      const values = [usuario]
      const [results] = await pool.query(query, values);
      
      if (results.length === 1) {
        const user = results[0];
        const isPasswordValid = await bcrypt.compare(senha, user.senha);
        
        if (isPasswordValid) {
          const payload = { id: user.id, usuario: user.usuario };
          const token = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
          const decodedToken = jwt.decode(token);
          const expirationDate = new Date(decodedToken.exp * 1000);
          return { 
            success: true,
            token: token,
            expiration: expirationDate,
            nome: user.nome,
            id: user.id
          };
        } else {
          return { success: false, errors: ["Senha incorreta"] };
        }
      } else {
        return { success: false, errors: ["Usuário não encontrado"] };
      }
    } catch (error) {
      return { success: false, errors: ["Erro no Banco de Dados"], details: error };
    }
}

async function registerUser(userData) {
    try {
      const { nome, nome_usuario, senha, cargo } = userData;
      const hashedSenha = await bcrypt.hash(senha, 10);
  
      const query = `INSERT INTO user (nome, user, senha) VALUES ( ?, ?, ?)`;
      const values = [nome, nome_usuario, hashedSenha, cargo];
  
      await pool.query(query, values);
      return { success: true, message: "Usuário cadastrado com sucesso" };
    } catch (error) {
      return { success: false, error: "Erro ao cadastrar usuário", details: error };
    }
  }

module.exports = {
    loginUser,
    registerUser
}