import React, { useState, useEffect } from 'react'; // Importe o useEffect
import axios from 'axios';
import apiConfig from '../apiConfig'; 

function UsuarioForm() {
  const [nome, setNome] = useState('');
  const [mensagemSucesso, setMensagemSucesso] = useState(''); 
  const [usuarios, setUsuarios] = useState([]); // Estado para a lista de usuários

  // Função para buscar usuários do backend
  const buscarUsuarios = async () => { 
    try {
      const response = await axios.get(`${apiConfig.baseUrl}/api/usuarios`);
      return response.data; 
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      return [];
    }
  };

  // UseEffect para carregar usuários ao iniciar e após adicionar
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

      // Buscar usuários atualizados após adicionar
      await buscarUsuarios().then((usuariosDoBackend) => { 
        setUsuarios(usuariosDoBackend);
      });
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
  };

  return (
    <div> {/* Adicione uma div pai para o formulário e a lista */}
       {/* Formulário para adicionar usuário */}
       <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome do usuário:</label>
          <input 
            type="text" 
            id="nome" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Adicionar Usuário</button>
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