import React from 'react';
import UsuarioForm from '../components/UsuarioForm';

function UsuarioNovoPage() {
  // Não passamos o ID, então o formulário assume o modo "Incluir"
  return <UsuarioForm />;
}

export default UsuarioNovoPage;