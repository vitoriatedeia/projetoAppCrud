// EXPRESS -> Framework para criar servidorea e API de forma rápida!
// EXPRESS -> Facilita na criação de rotas, a lidar com requsições e respostas.
const express = require("express");

// CORS -> Permite que nosso back-end aceite requisições vinda de outras origens ( React Native, React )
// CORS -> Sem o cors, os navegadores bloqueiam essas conexões.
const cors = require("cors");

// DOTENV -> Gerencia as variáveis de ambiente em um arquivo .env
// DOTENV -> Desta maneira não deixamos senhas, tokens e configs expostas no código!
const dotenv = require("dotenv");

const app = express();

dotenv.config();
app.use(cors());
