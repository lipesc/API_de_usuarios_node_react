import React, { useState, useEffect } from 'react'; // Importe o useEffect
import axios from 'axios';
import apiConfig from '../apiConfig'; 
import '../UserList.css';

function UsuarioForm() {
  const [nome, setNome] = useState('');
  const [mensagemSucesso, setMensagemSucesso] = useState(''); 
  const [usuarios, setUsuarios] = useState([]); 

  const buscarUsuarios = async () => { 
    try {
      const response = await axios.get(`${apiConfig.baseUrl}/api/usuarios`);
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
      await axios.post(`${apiConfig.baseUrl}/api/usuarios`, { nome });
      setNome('');
      setMensagemSucesso(`Usuário ${nome} criado com sucesso!`);
      setTimeout(() => {
        setMensagemSucesso(''); 
      }, 3000);

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
    <label htmlFor="nome" style={{ display: 'block', marginBottom: '5px' }}>Nome do usuário:</label>
    <input 
      type="text" 
      id="nome" 
      value={nome} 
      onChange={(e) => setNome(e.target.value)} 
      required 
      style={{ 
        width: '100%', 
        padding: '8px',
        border: '1px solid #ccc', 
        borderRadius: '4px'
      }}
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
          <li key={usuario._id}>{usuario.nome}</li>
        ))}
      </ul>
    </div>
  );
}

export default UsuarioForm;