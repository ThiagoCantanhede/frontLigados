import React, { useState, useEffect } from 'react';

export default function VisualizarVaga(props) {
  const [vagao, montarVagas] = useState([]);

  useEffect(() => {
    montarVagas(montarVaga());
  }, []);

  const montarVaga = () => {
    let vaga = localStorage.getItem('visualisandoVaga');
    vaga = JSON.parse(vaga);
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
                value={vaga.titulo}
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
                value={vaga.descricao}
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
                value={vaga.competencias}
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
                value={vaga.rendimentos}
                className="validate"
              ></input>
              <label className="active"> Rendimentos</label>
            </div>

            <div className="input-field col s4"></div>
            <div className="input-field col s8">
              <textarea
                id="beneficios"
                value={vaga.beneficios}
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
                value={vaga.dataLimite}
                className="validate"
              ></input>
              <label className="active">Data limite de candidatura</label>
            </div>
          </div>
        </form>
      </div>
    );
  };
  return <div className="row container">{vagao}</div>;
}
