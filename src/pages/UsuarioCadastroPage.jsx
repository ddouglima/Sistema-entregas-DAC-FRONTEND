import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function UsuarioCadastroPage() {
  const [formData, setFormData] = useState({ nome: '', login: '', senha: '' });
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');

    try {
      // Chama o endpoint de inclusão (POST /api/usuarios)
      await api.post('/usuarios', formData);
      
      setMensagem('Usuário cadastrado com sucesso! Você já pode fazer login.');
      
      // Após sucesso, redireciona de volta para a tela de login
      setTimeout(() => navigate('/'), 2000); 

    } catch (err) {
      const msg = err.response?.data?.message || 'Erro ao cadastrar usuário.';
      setMensagem(`Erro: ${msg}`);
      console.error('Erro de Cadastro:', err.response?.data || err);
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastrar Novo Usuário</h2>
      <form onSubmit={handleSubmit}>
        {/* Campos do formulário */}
        {/* ... */}
        <button type="submit">Cadastrar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
      <button type="button" onClick={() => navigate('/')}>Voltar para o Login</button>
    </div>
  );
}

export default UsuarioCadastroPage;