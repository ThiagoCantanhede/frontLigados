import React from 'react';
import operacoes from '../services/CurriculoService.js';
import { useHistory } from 'react-router-dom';
import tipos from '../tipos.js';
import salvarAuditoria from '../auditoria.js';

export default function CadastroCurriculo(props) {
  var formacao = '';
  var competencias = '';
  var experienciaProfissional = '';
  var nome = '';
  var id = '';
  const history = useHistory();

  const setFormacao = (event) => {
    formacao = event.target.value;
  };
  const setCompetencias = (event) => {
    competencias = event.target.value;
  };

  const setExperienciaProfissional = (event) => {
    experienciaProfissional = event.target.value;
  };

  const salvarCurriculo = () => {
    retornarIdNomeUsuario();
    var curriculo = {
      formacao: formacao,
      competencias: competencias,
      experienciaProfissional: experienciaProfissional,
      usuarioId: id,
      usuarioNome: nome,
    };
    operacoes.create(curriculo);
    salvarNaAuditoria();
    history.push('/');
  };

  const salvarNaAuditoria = async () => {
    let tipo = new tipos();
    let auditoria = new salvarAuditoria();
    auditoria.salvarAuditoria(id, tipo.cadastroCurriculo);
  };

  const retornarIdNomeUsuario = () => {
    let usuario = localStorage.getItem('login');
    usuario = JSON.parse(usuario);
    id = usuario._id;
    nome = usuario.nome;
  };

  return (
    <div className="row container">
      <form className="col s12">
        <div className="input-field col s12"></div>
        <div className="input-field col s12">
          <textarea
            id="formacao"
            onChange={setFormacao}
            style={{ height: 7 + 'em' }}
          ></textarea>
          <label className="active" htmlFor="formacao">
            Formação
          </label>
        </div>

        <div className="input-field col s12">
          <textarea
            id="competencias"
            onChange={setCompetencias}
            style={{ height: 7 + 'em' }}
          ></textarea>
          <label className="active" htmlFor="competencias">
            Competências
          </label>
        </div>

        <div className="input-field col s12">
          <textarea
            id="experiencia"
            onChange={setExperienciaProfissional}
            style={{ height: 7 + 'em' }}
          ></textarea>
          <label className="active" htmlFor="experiencia">
            Experiência profissional
          </label>
        </div>

        <div className="input-field col s12">
          <a className="waves-effect waves-light btn" onClick={salvarCurriculo}>
            Salvar
          </a>
        </div>
      </form>
    </div>
  );
}
