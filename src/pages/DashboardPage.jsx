import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const navigate = useNavigate();
  const [usuarioNome, setUsuarioNome] = useState('');

  // 1. Carregar nome do usuário logado (opcional, mas amigável)
  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (usuario && usuario.nome) {
      setUsuarioNome(usuario.nome);
    }
  }, []);

  // 2. Função de Logout
  const handleLogout = () => {
    localStorage.removeItem('usuarioLogado'); // Remove a credencial
    navigate('/'); // Redireciona para a tela de Login
  };

  return (
    <div className="dashboard-container">
      <header style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '10px 0',
          borderBottom: '1px solid #ccc' 
      }}>
        <h1>📦 Sistema de Entregas</h1>
        <div>
          <span>Olá, **{usuarioNome || 'Usuário'}**!</span>
          <button 
            onClick={handleLogout} 
            style={{ marginLeft: '15px', padding: '8px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', cursor: 'pointer' }}
          >
            Sair (Logout)
          </button>
        </div>
      </header>

      <section style={{ marginTop: '40px' }}>
        <h2>Selecione o Módulo de Cadastro</h2>
        <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
          
          {/* Menu para Cadastro 1: Usuários */}
          <button 
            onClick={() => navigate('/usuarios')}
            style={{ padding: '20px', fontSize: '1.1em', cursor: 'pointer', flex: 1 }}
          >
            👤 **Cadastro de Usuários**
          </button>

          {/* Menu para Cadastro 2: Pessoas */}
          <button 
            onClick={() => navigate('/pessoas')}
            style={{ padding: '20px', fontSize: '1.1em', cursor: 'pointer', flex: 1 }}
          >
            🧑‍💼 **Cadastro de Pessoas**
          </button>

          {/* Menu para Cadastro 3: Entregas (Ainda precisa do CRUD) */}
          <button 
            onClick={() => navigate('/entregas')}
            style={{ padding: '20px', fontSize: '1.1em', cursor: 'pointer', flex: 1 }}
          >
            🚚 **Controle de Entregas**
          </button>

        </div>
      </section>
      
      <footer style={{ marginTop: '50px', paddingTop: '20px', borderTop: '1px solid #eee', textAlign: 'center' }}>
        <p>Projeto de 2ª Avaliação e APS</p>
      </footer>
    </div>
  );
}

export default DashboardPage;