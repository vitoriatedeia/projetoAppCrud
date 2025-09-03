// EXPRESS -> Framework para criar servidorea e API de forma rápida!
// EXPRESS -> Facilita na criação de rotas, a lidar com requsições e respostas.
const express = require("express");

// CORS -> Permite que nosso back-end aceite requisições vinda de outras origens ( React Native, React )
// CORS -> Sem o cors, os navegadores bloqueiam essas conexões.
const cors = require("cors");

// DOTENV -> Gerencia as variáveis de ambiente em um arquivo .env
// DOTENV -> Desta maneira não deixamos senhas, tokens e configs expostas no código!
const dotenv = require("dotenv");

// MYSQL2 -> Biblioteca para conectarmos o Node ao banco MYSQL
// MYSQL2 -> Essa versão suporta Promises, permitindo usar async/await em consultas.
const mysql = require("mysql2/promise");

// BCRYPT -> Usado para criptografar as senhas.
// BCRYPT -> Nunca devemos salvar as senhas pura no banco, por isso usamos o bcrypt.
const bcrypt = require("bcrypt");

// JSONWEBTOKEN -> Gerar tokens de validação.
// JSONWEBTOKEN -> Quando o usuário loga, enviamos um JWT ao usuário, que será usado para acessar rotas potegidas.
const jwt = require("jsonwebtoken");

const PORT = 3001;
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

// Conexão com o banco MYSQL
const pool = mysql.createPool({
  host: process.env.DEB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

async function conexaoBd() {
  try {
    const conn = await pool.getConnection();
    console.log("Conexão com o MYSQL bem sucedida!");
    conn.release();
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

conexaoBd();

// Inicialização do servidor
app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta ${PORT}!`);
});
