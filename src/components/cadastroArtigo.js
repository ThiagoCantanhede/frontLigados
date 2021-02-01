import React from 'react';
import operacoes from '../services/ArtigoService.js';
import { useHistory } from 'react-router-dom';

export default function CadastroArtigo(props) {
  var titulo = '';
  var descricao = '';

  const history = useHistory();
  const setTitulo = (event) => {
    titulo = event.target.value;
  };
  const setDescricao = (event) => {
    descricao = event.target.value;
  };

  const salvarArtigo = () => {
    var artigo = {
      titulo: titulo,
      descricao: descricao,
      data: new Date(),
      autorId: retornarIdUsuario(),
    };
    operacoes.create(artigo);
    history.push('/');
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
              style={{ height: 40 + 'em' }}
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
