import React from 'react';
import { useParams } from 'react-router-dom';
import PessoaForm from '../components/PessoaForm';

function PessoaEditarPage() {
  const { id } = useParams(); // Pega o parâmetro ':id' da URL
  
  return <PessoaForm pessoaId={id} />;
}

export default PessoaEditarPage;