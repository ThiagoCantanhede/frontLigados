import React from 'react';
import { Link } from 'react-router-dom';

export default function ComponenteDetalhesVaga(props) {
  const vaga = props.vaga;
  console.log(vaga);
  const abrirCurriculo = (candidato) => {
    localStorage.setItem('visualisandoCandidato', JSON.stringify(candidato));
  };

  return (
    <form className="col s12">
      <div className="input-field col s12">
        <input
          id="titulo"
          type="text"
          value={vaga ? vaga.vaga.titulo : ''}
          className="validate"
        ></input>
        <label className="active" htmlFor="titulo">
          Título
        </label>
      </div>

      <div className="input-field col s12">
        <textarea
          id="descricao"
          value={vaga ? vaga.vaga.descricao : ''}
          style={{ height: 7 + 'em' }}
        ></textarea>
        <label className="active" htmlFor="descricao">
          Descrição da vaga
        </label>
      </div>

      <div className="input-field col s12">
        <textarea
          id="competencias"
          value={vaga ? vaga.vaga.competencias : ''}
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
          value={vaga ? vaga.vaga.rendimentos : ''}
          className="validate"
        ></input>
        <label className="active"> Rendimentos</label>
      </div>

      <div className="input-field col s12">
        <textarea
          id="beneficios"
          value={vaga ? vaga.vaga.beneficios : ''}
          style={{ height: 7 + 'em' }}
        ></textarea>
        <label className="active" htmlFor="Beneficios">
          Beneficios
        </label>
      </div>
      <div className="input-field col s12">
        <span>CANDIDATOS:</span>
        {vaga
          ? vaga.candidatos
            ? vaga.candidatos.map((c) => {
                return (
                  <p>
                    <a href="#" onClick={() => abrirCurriculo(c)}>
                      <Link to="/candidato">
                        {c.nome} - {c.email}
                      </Link>
                    </a>
                  </p>
                );
              })
            : ''
          : ''}
      </div>
    </form>
  );
}
