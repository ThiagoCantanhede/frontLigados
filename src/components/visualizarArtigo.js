import React, { useState, useEffect } from 'react';

export default function VisualizarArtigo(props) {
  var titulo = '';
  var descricao = '';
  var nome = '';
  var id = '';

  const retornarIdNomeUsuario = () => {
    let usuario = localStorage.getItem('login');
    usuario = JSON.parse(usuario);
    id = usuario._id;
    nome = usuario.nome;
  };

  const [artigo, montarArtigos] = useState([]);

  useEffect(() => {
    montarArtigos(montarArtigo());
  }, []);

  const montarArtigo = () => {
    let artigoRecuperado = localStorage.getItem('visualisandoArtigo');
    artigoRecuperado = JSON.parse(artigoRecuperado);
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
                onChange={artigoRecuperado.titulo}
                className="validate"
                readOnly
              ></input>
              <label className="active" htmlFor="titulo">
                Título
              </label>
            </div>

            <div className="input-field col s4"></div>
            <div className="input-field col s8">
              <textarea
                id="descricao"
                onChange={artigoRecuperado.descricao}
                style={{ height: 40 + 'em' }}
                readOnly
              ></textarea>
              <label className="active" htmlFor="descricao">
                Descrição
              </label>
            </div>
          </div>
        </form>
      </div>
    );
  };
  return <div className="row container">{artigo}</div>;
}
