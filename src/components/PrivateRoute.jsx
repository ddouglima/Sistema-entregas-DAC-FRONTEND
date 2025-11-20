import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  // Simplesmente checa se há dados de usuário no localStorage
  // Você pode melhorar esta verificação no futuro.
  const isLogged = localStorage.getItem('usuarioLogado');

  // Se estiver logado, renderiza o componente filho (Outlet)
  // Caso contrário, redireciona para a página de Login (/)
  return isLogged ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;