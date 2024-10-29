import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import apiConfig from '../apiConfig';
import '../UserList.css';

function UsuarioForm() {
  const [nome, setNome] = useState('');
  const [last, setLast] = useState('');
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const baseUrl = 'http://localhost:3001';
  const buscarUsuarios = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/usuarios`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      return [];
    }
  };

  useEffect(() => {
    const carregarUsuarios = async () => {
      const usuariosDoBackend = await buscarUsuarios();
      setUsuarios(usuariosDoBackend);
    };
    carregarUsuarios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseUrl}/api/usuarios`, { nome, last });
      setNome('');
      setLast('');
      setMensagemSucesso(`Usuário ${nome} ${last} criado com sucesso!`);
      setTimeout(() => {
        setMensagemSucesso('');
      }, 5000);

      await buscarUsuarios().then((usuariosDoBackend) => {
        setUsuarios(usuariosDoBackend);
      });
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
  };

  return (
    <div>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="nome" style={{ display: 'block', marginBottom: '5px' }}>Nome e sobrenome do usuário:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(n) => setNome(n.target.value)}
            required
          />
          <input
            type="text"
            id="lastName"
            value={last}
            onChange={(l) => setLast(l.target.value)}
            required
          />
        </div>
        <button type="submit" style={{
          padding: '8px 15px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Adicionar Usuário
        </button>
      </form>

      {mensagemSucesso && <div className="mensagem-sucesso">{mensagemSucesso}</div>}

      <h2>Lista de Usuários:</h2>
      <ul>
        {usuarios.map(usuario => (
          <li key={usuario._id}>
            ID: {usuario._id},
            Nome: {usuario.nome} {usuario.last}.</li>
        ))}
      </ul>
    </div>
  );
}

export default UsuarioForm;
