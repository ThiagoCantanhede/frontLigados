import React, { useState, useEffect } from 'react';
import operacoes from '../services/ArtigoService.js';
import { useHistory } from 'react-router-dom';

export default function VisualizarEditarArtigo(props) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  let artigoRecuperado = null;
  const history = useHistory();
  useEffect(() => {
    montarArtigo();
  }, [titulo, descricao]);

  const montarArtigo = () => {
    artigoRecuperado = localStorage.getItem('visualisandoArtigo');
    artigoRecuperado = JSON.parse(artigoRecuperado);
    if (titulo === '') setTitulo(artigoRecuperado.titulo);
    if (descricao === '') setDescricao(artigoRecuperado.descricao);
  };

  const handleTitulo = (event) => {
    console.log(event.target.value);
    setTitulo(event.target.value);
  };

  const handleDescricao = (event) => {
    setDescricao(event.target.value);
  };

  const salvarArtigo = () => {
    artigoRecuperado.titulo = titulo;
    artigoRecuperado.descricao = descricao;
    operacoes.update(artigoRecuperado._id, artigoRecuperado);
    history.push('/');
  };
  // const montarArtigo = () => {
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
              value={titulo}
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
              value={descricao}
              style={{ height: 40 + 'em' }}
              onChange={handleDescricao}
            ></textarea>
            <label className="active" htmlFor="descricao">
              Descrição
            </label>
          </div>
          <div className="input-field col s4"></div>
          <div className="input-field col s8">
            <a className="waves-effect waves-light btn" onClick={salvarArtigo}>
              Salvar
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
//  return <div className="row container">{artigo}</div>;
//}
