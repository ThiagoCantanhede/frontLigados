import React from 'react';
import operacoes from '../services/VagasService.js';
import { useHistory } from 'react-router-dom';
import salvarAuditoria from '../auditoria.js';
import tipos from '../tipos.js';

export default function CadastroVaga(props) {
  var titulo = '';
  var descricao = '';
  var competencias = '';
  var rendimentos = '';
  var beneficios = '';
  var dataLimite = '';

  const history = useHistory();
  const setTitulo = (event) => {
    titulo = event.target.value;
  };
  const setDescricao = (event) => {
    descricao = event.target.value;
  };

  const setCompetencias = (event) => {
    competencias = event.target.value;
  };

  const setRendimentos = (event) => {
    rendimentos = event.target.value;
  };

  const setBeneficios = (event) => {
    beneficios = event.target.value;
  };

  const setDataLimite = (event) => {
    dataLimite = event.target.value;
  };

  const salvarVaga = () => {
    var vaga = {
      titulo: titulo,
      competencias: competencias,
      descricao: descricao,
      rendimentos: rendimentos,
      beneficios: beneficios,
      dataLimiteCandidatura: dataLimite,
      dataPublicacao: Date.now(),
      usuarioId: retornarIdUsuario(),
    };
    operacoes.create(vaga);
    salvarNaAuditoria();
    history.push('/minhasVagas');
  };

  const salvarNaAuditoria = async () => {
    let tipo = new tipos();
    let auditoria = new salvarAuditoria();
    auditoria.salvarAuditoria(retornarIdUsuario(), tipo.cadastroVaga);
  };

  const retornarIdUsuario = () => {
    let usuario = sessionStorage.getItem('login');
    usuario = JSON.parse(usuario);
    return usuario._id;
  };

  return (
    <div className="row container">
      <form className="col s12">
        <div className="row container">
          <div className="input-field col s12"></div>
          <div className="input-field col s4"></div>
          <div className="input-field col s8">
            <input
              id="titulo"
              type="text"
              onChange={setTitulo}
              className="validate"
            ></input>
            <label className="active" htmlFor="titulo">
              Título
            </label>
          </div>

          <div className="input-field col s4"></div>
          <div className="input-field col s8">
            <textarea
              id="descricao"
              onChange={setDescricao}
              style={{ height: 7 + 'em' }}
            ></textarea>
            <label className="active" htmlFor="descricao">
              Descrição da vaga
            </label>
          </div>

          <div className="input-field col s4"></div>
          <div className="input-field col s8">
            <textarea
              id="competencias"
              onChange={setCompetencias}
              style={{ height: 7 + 'em' }}
            ></textarea>
            <label className="active" htmlFor="competencias">
              Requisitos da vaga
            </label>
          </div>

          <div className="input-field col s4"></div>
          <div className="input-field col s8">
            <input
              id="rendimentos"
              type="text"
              onChange={setRendimentos}
              className="validate"
            ></input>
            <label className="active"> Rendimentos</label>
          </div>

          <div className="input-field col s4"></div>
          <div className="input-field col s8">
            <textarea
              id="beneficios"
              onChange={setBeneficios}
              style={{ height: 7 + 'em' }}
            ></textarea>
            <label className="active" htmlFor="Beneficios">
              Beneficios
            </label>
          </div>

          <div className="input-field col s4"></div>
          <div className="input-field col s8">
            <input
              id="data"
              type="text"
              onChange={setDataLimite}
              className="validate"
            ></input>
            <label className="active">Data limite de candidatura</label>
          </div>

          <div className="input-field col s4"></div>
          <div className="input-field col s8">
            <a className="waves-effect waves-light btn" onClick={salvarVaga}>
              Salvar
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
