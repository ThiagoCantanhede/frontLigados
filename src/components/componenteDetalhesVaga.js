import React from 'react';
import { useHistory } from 'react-router-dom';

export default function ComponenteDetalhesVaga(props) {
  var titulo = '';
  var descricao = '';
  var competencias = '';
  var rendimentos = '';
  var beneficios = '';
  var dataLimite = '';
  const vaga = props.vaga;
  const history = useHistory();

  return (
    <form className="col s12">
      <div className="input-field col s12">
        <input
          id="titulo"
          type="text"
          value={vaga ? vaga.titulo : ''}
          className="validate"
        ></input>
        <label className="active" htmlFor="titulo">
          Título
        </label>
      </div>

      <div className="input-field col s12">
        <textarea
          id="descricao"
          value={vaga ? vaga.descricao : ''}
          style={{ height: 7 + 'em' }}
        ></textarea>
        <label className="active" htmlFor="descricao">
          Descrição da vaga
        </label>
      </div>

      <div className="input-field col s12">
        <textarea
          id="competencias"
          value={vaga ? vaga.competencias : ''}
          style={{ height: 7 + 'em' }}
        ></textarea>
        <label className="active" htmlFor="competencias">
          Requisitos da vaga
        </label>
      </div>

      <div className="input-field col s12">
        <input
          id="rendimentos"
          type="text"
          value={vaga ? vaga.rendimentos : ''}
          className="validate"
        ></input>
        <label className="active"> Rendimentos</label>
      </div>

      <div className="input-field col s12">
        <textarea
          id="beneficios"
          value={vaga ? vaga.beneficios : ''}
          style={{ height: 7 + 'em' }}
        ></textarea>
        <label className="active" htmlFor="Beneficios">
          Beneficios
        </label>
      </div>
    </form>
  );
}
