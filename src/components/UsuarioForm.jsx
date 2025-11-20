import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function UsuarioForm({ usuarioId }) {
  const [formData, setFormData] = useState({ 
    nome: '', 
    login: '', 
    senha: '' // Senha é sempre enviada, mas só é obrigatória na criação
  });
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isEdit = !!usuarioId; // Verdadeiro se um ID for fornecido

  // 1. Lógica para EDITAR (Carregar dados existentes)
  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      api.get(`/usuarios/${usuarioId}`)
        .then(response => {
          // O backend deve ter um endpoint GET /api/usuarios/:id (implícito no listar/editar)
          const data = response.data; 
          
          // Preenche os campos, excluindo a senha (por segurança)
          setFormData({
            nome: data.nome,
            login: data.login,
            senha: '' // Deixar a senha vazia para que o usuário só envie uma nova se quiser
          });
          setLoading(false);
        })
        .catch(err => {
          setMensagem('Erro ao carregar dados do usuário para edição.');
          setLoading(false);
        });
    }
  }, [usuarioId, isEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');
    setLoading(true);

    try {
      let response;
      const dataToSubmit = { ...formData };
      
      // Se for edição e a senha estiver vazia, não a envie
      if (isEdit && dataToSubmit.senha === '') {
        delete dataToSubmit.senha; 
      }

      if (isEdit) {
        // Rota PUT para Editar
        response = await api.put(`/usuarios/${usuarioId}`, dataToSubmit);
      } else {
        // Rota POST para Incluir
        response = await api.post('/usuarios', dataToSubmit);
      }

      setMensagem(`${isEdit ? 'Usuário atualizado' : 'Usuário cadastrado'} com sucesso!`);
      
      // Redireciona para a lista após 2 segundos
      setTimeout(() => navigate('/usuarios'), 2000); 

    } catch (err) {
      const msg = err.response?.data?.message || `Erro ao ${isEdit ? 'editar' : 'cadastrar'} usuário.`;
      setMensagem(`Erro: ${msg}`);
      console.error('Erro no formulário:', err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  if (isEdit && loading) return <div>Carregando dados para edição...</div>;

  return (
    <div className="form-container">
      <h2>{isEdit ? `Editar Usuário ID: ${usuarioId}` : 'Incluir Novo Usuário'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome || ''}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="login">Login:</label>
          <input
            type="text"
            id="login"
            name="login"
            value={formData.login || ''}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="senha">{isEdit ? 'Nova Senha (Opcional):' : 'Senha:'}</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            required={!isEdit} // Senha obrigatória apenas na inclusão
            disabled={loading}
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Processando...' : (isEdit ? 'Salvar Edição' : 'Cadastrar')}
        </button>
      </form>

      {mensagem && <p style={{ color: mensagem.startsWith('Erro') ? 'red' : 'green' }}>{mensagem}</p>}
      
      <button 
        type="button" 
        onClick={() => navigate('/usuarios')} 
        style={{ marginTop: '10px' }}
      >
        Voltar para a Lista
      </button>

    </div>
  );
}

export default UsuarioForm;