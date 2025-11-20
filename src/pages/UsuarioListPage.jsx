import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function UsuarioListPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Função para carregar os usuários do backend
  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      const response = await api.get('/usuarios'); // GET /api/usuarios
      setUsuarios(response.data);
      setError(null);
    } catch (err) {
      console.error("Erro ao carregar usuários:", err);
      setError("Não foi possível carregar a lista de usuários.");
    } finally {
      setLoading(false);
    }
  };

  // Executa a função de carregamento uma vez ao montar o componente
  useEffect(() => {
    fetchUsuarios();
  }, []); 

  // Função para excluir um usuário
  const handleDelete = async (usuario_id) => {
    if (!window.confirm(`Tem certeza que deseja excluir o usuário ID: ${usuario_id}?`)) {
      return;
    }

    try {
      await api.delete(`/usuarios/${usuario_id}`); // DELETE /api/usuarios/:id
      // Se a exclusão for bem-sucedida, recarrega a lista de usuários
      alert("Usuário excluído com sucesso!");
      fetchUsuarios(); 
    } catch (err) {
      console.error("Erro ao excluir usuário:", err);
      alert(err.response?.data?.message || "Erro ao excluir. Verifique se há registros associados (Chave Estrangeira).");
    }
  };

  if (loading) return <div>Carregando usuários...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="listagem-container">
      <h2>Cadastro 1: Usuários</h2>

      <button 
        onClick={() => navigate('/usuarios/novo')} 
        style={{ marginBottom: '20px' }}
      >
        ➕ Novo Usuário (Incluir)
      </button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Login</th>
            <th>Última Atualização</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length === 0 ? (
            <tr><td colSpan="5">Nenhum usuário cadastrado.</td></tr>
          ) : (
            usuarios.map((user) => (
              <tr key={user.usuario_id}>
                <td>{user.usuario_id}</td>
                <td>{user.nome}</td>
                <td>{user.login}</td>
                <td>{new Date(user.atualizado_em).toLocaleDateString()}</td>
                <td>
                  {/* Botão para o EDITAR - Redireciona para o formulário de edição */}
                  <button onClick={() => navigate(`/usuarios/editar/${user.usuario_id}`)}>
                    Editar
                  </button>
                  
                  {/* Botão para o EXCLUIR */}
                  <button onClick={() => handleDelete(user.usuario_id)} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>
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

export default UsuarioListPage;