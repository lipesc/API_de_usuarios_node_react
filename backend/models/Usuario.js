const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nome: { 
    type: String, require: true
  }
});

module.exports = mongoose.model('Usuario', usuarioSchema);