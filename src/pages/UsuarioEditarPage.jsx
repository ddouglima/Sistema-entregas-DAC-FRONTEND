import React from 'react';
import { useParams } from 'react-router-dom';
import UsuarioForm from '../components/UsuarioForm';

function UsuarioEditarPage() {
  const { id } = useParams(); // Pega o parâmetro ':id' da URL
  
  // Passamos o ID, então o formulário assume o modo "Editar"
  return <UsuarioForm usuarioId={id} />;
}

export default UsuarioEditarPage;