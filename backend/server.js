const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const Usuario = require('./models/Usuario')

const app = express();
const PORT = 3001;
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://mongodb:27017/db-js')
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));


const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de usuários',
      version: '0.1',
      description: 'API para gerenciar usuarios',
    },
    servers: [
      {
        url: 'http://localhost:3001',
      },
    ],
  },
  apis: ['backend/server.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/swagger', swaggerUi.serve,
  swaggerUi.setup(swaggerDocs));


app.get('/api/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);

  } catch (error) {
    console.error("Erro ao buscar usuarios", error);
    res.status(500).json({ error: 'Erro ao buscar usuarios.' });
  }
});

app.post('/api/usuarios', async (req, res) => {
  console.log("Requisição POST recebida em /api/usuarios");
  try {
    const novoUsuario = new Usuario(req.body);
    await novoUsuario.save();
    res.status(201).send(`Usuario ${novoUsuario} criado`);
  } catch (error) {
    console.error("Error ao criar o usuario");
    res.status(500).json({ error: "Error ao criar o usuario " });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor up na porta ${PORT} ****`);
});

