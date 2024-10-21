const express= require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const Usuario = require('./models/Usuario')

const app = express();
const PORT = 3001;

mongoose.connect('mongodb://localhost:27017/db-js', {
  useNewUrlParser: true, uneUnifieldTopology: true
});

app.use(cors());
app.use(express.json());

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

app.get('api/usuarios', async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
});

app.use('api/usuarios', async (req, res) => {
  const novoUsario = new Usuario(req.body);
  await novoUsario.save();
  res.status(201).send(`Usuario ${novoUsario} criado`);
});

app.listen(PORT, () => {
  console.log(`Servidor up na porta ${PORT} ****`);
});

