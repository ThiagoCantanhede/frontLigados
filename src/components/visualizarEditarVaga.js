import React, { useState, useEffect } from 'react';
import operacoes from '../services/VagasService.js';

export default function VisualizarEditarVaga(props) {
  const [vaga, setVaga] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [beneficios, setBeneficios] = useState('');
  const [descricao, setDescricao] = useState('');
  const [competencias, setCompetencias] = useState('');
  const [rendimentos, setRendimentos] = useState('');

  useEffect(() => {
    montarVaga();
  }, [titulo, descricao, competencias, rendimentos, beneficios]);

  const montarVaga = () => {
    let lVaga = localStorage.getItem('visualisandoVaga');
    lVaga = JSON.parse(lVaga);
    lVaga = lVaga.vaga;
    setVaga(lVaga);
    if (titulo === '') setTitulo(lVaga.titulo);
    if (beneficios === '') setBeneficios(lVaga.beneficios);
    if (descricao === '') setDescricao(lVaga.descricao);
    if (competencias === '') setCompetencias(lVaga.competencias);
    if (rendimentos === '') setRendimentos(lVaga.rendimentos);
  };

  const handleTitulo = (event) => {
    setTitulo(event.target.value);
  };
  const handleDescricao = (event) => {
    console.log(event.target.value);
    setDescricao(event.target.value);
  };
  const handleCompetencias = (event) => {
    setCompetencias(event.target.value);
  };
  const handleRendimentos = (event) => {
    setRendimentos(event.target.value);
  };
  const handleBeneficios = (event) => {
    setBeneficios(event.target.value);
  };

  const salvarVaga = () => {
    let lvaga = {
      titulo: titulo,
      competencias: competencias,
      descricao: descricao,
      rendimentos: rendimentos,
      beneficios: beneficios,
      usuarioId: retornarIdUsuario(),
    };
    operacoes.update(vaga._id, lvaga);
  };

  const retornarIdUsuario = () => {
    let usuario = localStorage.getItem('login');
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
              onChange={titulo}
              onChange={handleTitulo}
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
              onChange={descricao}
              onChange={handleDescricao}
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
              onChange={competencias}
              onChange={handleCompetencias}
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
              onChange={rendimentos}
              onChange={handleRendimentos}
              className="validate"
            ></input>
            <label className="active"> Rendimentos</label>
          </div>

          <div className="input-field col s4"></div>
          <div className="input-field col s8">
            <textarea
              id="beneficios"
              onChange={beneficios}
              onChange={handleBeneficios}
              style={{ height: 7 + 'em' }}
            ></textarea>
            <label className="active" htmlFor="Beneficios">
              Beneficios
            </label>
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