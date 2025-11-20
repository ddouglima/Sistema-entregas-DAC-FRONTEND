import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function PessoaForm({ pessoaId }) {
  const isEdit = !!pessoaId;
  const [formData, setFormData] = useState({ 
    nome: '', 
    cpf: '', 
    nascimento: '', // Deve ser formatado como yyyy-mm-dd
    telefone: '',
    pessoa_tipo_id: ''
  });
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Função auxiliar para formatar datas (necessário para o campo <input type="date">)
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      // Tenta formatar a data que vem do banco de dados (que pode ser um timestamp)
      return new Date(dateString).toISOString().split('T')[0];
    } catch (e) {
      return dateString;
    }
  };

  // Lógica para EDITAR (Carregar dados existentes)
  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      // Você precisará garantir que seu backend tenha um endpoint GET /api/pessoas/:id
      api.get(`/pessoas/${pessoaId}`)
        .then(response => {
          const data = response.data; 
          setFormData({
            nome: data.nome,
            cpf: data.cpf,
            // Formata a data de nascimento para o campo input type="date"
            nascimento: formatDate(data.nascimento), 
            telefone: data.telefone,
            pessoa_tipo_id: data.pessoa_tipo_id
          });
          setLoading(false);
        })
        .catch(err => {
          setMensagem('Erro ao carregar dados da pessoa para edição.');
          setLoading(false);
        });
    }
  }, [pessoaId, isEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');
    setLoading(true);

    try {
      if (isEdit) {
        // Rota PUT para Editar
        await api.put(`/pessoas/${pessoaId}`, formData);
      } else {
        // Rota POST para Incluir
        await api.post('/pessoas', formData);
      }

      setMensagem(`${isEdit ? 'Pessoa atualizada' : 'Pessoa cadastrada'} com sucesso!`);
      
      // Redireciona para a lista após 2 segundos
      setTimeout(() => navigate('/pessoas'), 2000); 

    } catch (err) {
      const msg = err.response?.data?.message || `Erro ao ${isEdit ? 'editar' : 'cadastrar'} pessoa.`;
      setMensagem(`Erro: ${msg}`);
      console.error('Erro no formulário:', err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  if (isEdit && loading) return <div>Carregando dados para edição...</div>;

  return (
    <div className="form-container">
      <h2>{isEdit ? `Editar Pessoa ID: ${pessoaId}` : 'Incluir Nova Pessoa'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input type="text" id="nome" name="nome" value={formData.nome || ''} onChange={handleChange} required disabled={loading} />
        </div>
        <div>
          <label htmlFor="cpf">CPF:</label>
          <input type="text" id="cpf" name="cpf" value={formData.cpf || ''} onChange={handleChange} required disabled={loading} maxLength="14" />
        </div>
        <div>
          <label htmlFor="nascimento">Data Nasc.:</label>
          {/* O campo type="date" precisa do formato yyyy-mm-dd */}
          <input type="date" id="nascimento" name="nascimento" value={formData.nascimento || ''} onChange={handleChange} required disabled={loading} />
        </div>
        <div>
          <label htmlFor="telefone">Telefone:</label>
          <input type="text" id="telefone" name="telefone" value={formData.telefone || ''} onChange={handleChange} required disabled={loading} maxLength="20" />
        </div>
        <div>
          <label htmlFor="pessoa_tipo_id">Tipo de Pessoa (ID):</label>
          <input type="number" id="pessoa_tipo_id" name="pessoa_tipo_id" value={formData.pessoa_tipo_id || ''} onChange={handleChange} required disabled={loading} min="1" />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Processando...' : (isEdit ? 'Salvar Edição' : 'Cadastrar')}
        </button>
      </form>

      {mensagem && <p style={{ color: mensagem.startsWith('Erro') ? 'red' : 'green' }}>{mensagem}</p>}
      
      <button type="button" onClick={() => navigate('/pessoas')} style={{ marginTop: '10px' }}>
        Voltar para a Lista
      </button>

    </div>
  );
}

export default PessoaForm;