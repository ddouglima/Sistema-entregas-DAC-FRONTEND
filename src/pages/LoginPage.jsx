import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function LoginPage() {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      // Chama o endpoint de login no seu backend Node.js
      const response = await api.post('/auth/login', { login, senha });
      
      // Se o login for bem-sucedido:
      const { usuario } = response.data;
      
      // Salvar informações do usuário (ex: no localStorage)
      localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
      
      // Redirecionar para o Dashboard/página inicial
      navigate('/dashboard'); 

    } catch (err) {
      // Erro 401: Credenciais inválidas (conforme seu loginController.js)
      setErro('Credenciais inválidas. Verifique seu login e senha.');
      console.error('Erro de Login:', err.response?.data || err);
    }
  };

  return (
    <div className="login-container">
      <h2>Acesso ao Sistema de Entregas</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="login">Login:</label>
          <input
            type="text"
            id="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      {/* Botão para cadastrar novo usuário (Critério 7) */}
      <p>
        Novo por aqui? 
        <button 
          type="button" 
          onClick={() => navigate('/cadastro-usuario')}
          style={{ marginLeft: '10px' }}
        >
          Cadastrar Novo Usuário
        </button>
      </p>
    </div>
  );
}

export default LoginPage;