import React from 'react';
import operacoes from '../services/CurriculoService.js';

export default function CadastroCurriculo(props) {
  var formacao = '';
  var competencias = '';
  var experienciaProfissional = '';

  const setFormacao = (event) => {
    formacao = event.target.value;
  };
  const setCompetencias = (event) => {
    competencias = event.target.value;
  };

  const setExperienciaProfissional = (event) => {
    experienciaProfissional = event.target.value;
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
          <a className="waves-effect waves-light btn">Salvar</a>
        </div>
      </form>
    </div>
  );
}
