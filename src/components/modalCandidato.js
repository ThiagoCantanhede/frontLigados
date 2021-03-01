import React, { useState, useEffect } from 'react';
import operacoes from '../services/CurriculoService.js';
import { useHistory } from 'react-router-dom';
import salvarAuditoria from '../auditoria.js';
import tipos from '../tipos.js';

export default function CadastroCurriculo(props) {
  const history = useHistory();
  const [curriculoCandidato, montarCurriculo] = useState([]);

  useEffect(async () => {
    montarCurriculo(await curriculo());
  }, []);

  const salvarNaAuditoria = async (id) => {
    let tipo = new tipos();
    let auditoria = new salvarAuditoria();
    auditoria.salvarAuditoria(id, tipo.visualizacaoCurriculo);
  };
  const curriculo = async () => {
    let candidatoId = localStorage.getItem('visualisandoCandidato');
    candidatoId = JSON.parse(candidatoId);
    const retorno = await operacoes.encontrarCurriculoPorUsuario(
      candidatoId._id
    );

    await salvarNaAuditoria(candidatoId._id);

    const formacao = retorno.data[0].formacao;
    const competencias = retorno.data[0].competencias;
    const experiencia = retorno.data[0].experienciaProfissional;

    const chamarModalMensagem = () => {
      history.push('/mensagem');
    };

    return (
      <div className="row container">
        <form className="col s12">
          <div className="input-field col s12"></div>
          <div className="input-field col s12">
            <textarea
              id="formacao"
              style={{ height: 7 + 'em' }}
              value={formacao}
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
              value={competencias}
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
              value={experiencia}
              readOnly
            ></textarea>
            <label className="active" htmlFor="experiencia">
              Experiência profissional
            </label>
          </div>
          <div className="input-field col s4"></div>
          <div className="input-field col s8">
            <a
              className="waves-effect waves-light btn "
              onClick={chamarModalMensagem}
            >
              Enviar mensagem
            </a>
          </div>
        </form>
      </div>
    );
  };
  return <div className="row container">{curriculoCandidato}</div>;
}
