import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

// Importação das Páginas (Certifique-se de criá-las em src/pages/)
import LoginPage from './pages/LoginPage';
import UsuarioCadastroPage from './pages/UsuarioCadastroPage';
import DashboardPage from './pages/DashboardPage';

// Importações dos Cadastros (CRUDs)
import UsuarioListPage from './pages/UsuarioListPage';
import PessoaListPage from './pages/PessoaListPage';
// import EntregaListPage from './pages/EntregaListPage';

import UsuarioNovoPage from './pages/UsuarioNovoPage';
import UsuarioEditarPage from './pages/UsuarioEditarPage';

import PessoaNovoPage from './pages/PessoaNovoPage';
import PessoaEditarPage from './pages/PessoaEditarPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* Você pode adicionar um Header/Menu de Navegação aqui */}
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/cadastro-usuario" element={<UsuarioCadastroPage />} />
          
          {/* Rotas Protegidas (Requer Login) */}
          <Route element={<PrivateRoute />}>
            
            {/* Dashboard (Página inicial após o login) */}
            <Route path="/dashboard" element={<DashboardPage />} />

            {/* Cadastro 1: Usuários (CRUD Completo) */}
            <Route path="/usuarios" element={<UsuarioListPage />} />
            
            {/* Rota para INCLUIR (POST /api/usuarios) */}
            <Route path="/usuarios/novo" element={<UsuarioNovoPage />} /> 
            
            {/* Rota para EDITAR (PUT /api/usuarios/:id) */}
            <Route path="/usuarios/editar/:id" element={<UsuarioEditarPage />} /> 
            
            {/* Cadastro 2: Pessoas (CRUD Completo) - NOVAS ROTAS */}
            <Route path="/pessoas" element={<PessoaListPage />} />
            <Route path="/pessoas/novo" element={<PessoaNovoPage />} /> 
            <Route path="/pessoas/editar/:id" element={<PessoaEditarPage />} /> 

            {/* Cadastro 3: Entregas (A SER IMPLEMENTADO) */}
            {/* <Route path="/entregas" element={<EntregaListPage />} /> */}

          </Route>
          {/* ---------------------------------------------------- */}

          {/* Rota para páginas não encontradas (404) */}
          <Route path="*" element={<div>Página Não Encontrada (404)</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;