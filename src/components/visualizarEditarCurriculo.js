import React, { useState, useEffect } from 'react';
import operacoes from '../services/CurriculoService.js';
import { useHistory } from 'react-router-dom';

export default function VisualizarEditarCurriculo(props) {
  const history = useHistory();
  const [curriculoCandidato, montarCurriculo] = useState([]);

  useEffect(async () => {
    montarCurriculo(await curriculo());
  }, []);

  const curriculo = async () => {
    let candidatoId = localStorage.getItem('visualisandoCandidato');
    const retorno = await operacoes.encontrarCurriculoPorUsuario(candidatoId);

    var formacao = retorno.data[0].formacao;
    var competencias = retorno.data[0].competencias;
    var experiencia = retorno.data[0].experienciaProfissional;

    return (
      <div className="row container">
        <form className="col s12">
          <div className="input-field col s12"></div>
          <div className="input-field col s12">
            <textarea
              id="formacao"
              style={{ height: 7 + 'em' }}
              onChange={formacao}
              readOnly
            ></textarea>
            <label className="active" htmlFor="formacao">
              Formação
            </label>
          </div>

          <div className="input-field col s12">
            <textarea
              id="competencias"
              style={{ height: 7 + 'em' }}
              onChange={competencias}
              readOnly
            ></textarea>
            <label className="active" htmlFor="competencias">
              Competências
            </label>
          </div>

          <div className="input-field col s12">
            <textarea
              id="experiencia"
              style={{ height: 7 + 'em' }}
              onChange={experiencia}
              readOnly
            ></textarea>
            <label className="active" htmlFor="experiencia">
              Experiência profissional
            </label>
          </div>
        </form>
      </div>
    );
  };
  return <div className="row container">{curriculoCandidato}</div>;
}
