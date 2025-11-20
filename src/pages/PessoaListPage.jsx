import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function PessoaListPage() {
  const [pessoas, setPessoas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchPessoas = async () => {
    try {
      setLoading(true);
      const response = await api.get('/pessoas'); // GET /api/pessoas
      setPessoas(response.data);
      setError(null);
    } catch (err) {
      console.error("Erro ao carregar pessoas:", err);
      setError("Não foi possível carregar a lista de pessoas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPessoas();
  }, []); 

  const handleDelete = async (pessoa_id) => {
    if (!window.confirm(`Tem certeza que deseja excluir a Pessoa ID: ${pessoa_id}?`)) {
      return;
    }

    try {
      await api.delete(`/pessoas/${pessoa_id}`); // DELETE /api/pessoas/:id
      alert("Pessoa excluída com sucesso!");
      fetchPessoas(); 
    } catch (err) {
      console.error("Erro ao excluir pessoa:", err);
      alert(err.response?.data?.message || "Erro ao excluir. Verifique se há Entregas ou Usuários associados.");
    }
  };

  if (loading) return <div>Carregando Pessoas...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="listagem-container">
      <h2>Cadastro 2: Pessoas</h2>

      <button 
        onClick={() => navigate('/pessoas/novo')} 
        style={{ marginBottom: '20px' }}
      >
        ➕ Nova Pessoa (Incluir)
      </button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>Tipo ID</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pessoas.length === 0 ? (
            <tr><td colSpan="6">Nenhuma pessoa cadastrada.</td></tr>
          ) : (
            pessoas.map((pessoa) => (
              <tr key={pessoa.pessoa_id}>
                <td>{pessoa.pessoa_id}</td>
                <td>{pessoa.nome}</td>
                <td>{pessoa.cpf}</td>
                <td>{pessoa.telefone}</td>
                <td>{pessoa.pessoa_tipo_id}</td>
                <td>
                  <button onClick={() => navigate(`/pessoas/editar/${pessoa.pessoa_id}`)}>
                    Editar
                  </button>
                  <button onClick={() => handleDelete(pessoa.pessoa_id)} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      
      <p style={{marginTop: '20px'}}>
        <button onClick={() => navigate('/dashboard')}>Voltar para o Dashboard</button>
      </p>

    </div>
  );
}

export default PessoaListPage;