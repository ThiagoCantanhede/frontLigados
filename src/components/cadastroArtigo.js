import React from 'react';
import operacoes from '../services/ArtigoService.js';
import { useHistory } from 'react-router-dom';
import tipos from '../tipos.js';
import salvarAuditoria from '../auditoria.js';

export default function CadastroArtigo(props) {
  var titulo = '';
  var descricao = '';
  var nome = '';
  var id = '';

  const history = useHistory();
  const setTitulo = (event) => {
    titulo = event.target.value;
  };
  const setDescricao = (event) => {
    descricao = event.target.value;
  };

  const salvarArtigo = () => {
    retornarIdNomeUsuario();
    var artigo = {
      titulo: titulo,
      descricao: descricao,
      data: new Date(),
      autorId: id,
      autorNome: nome,
    };
    operacoes.create(artigo);
    salvarNaAuditoria();
    history.push('/');
  };

  const salvarNaAuditoria = async () => {
    let tipo = new tipos();
    let auditoria = new salvarAuditoria();
    auditoria.salvarAuditoria(id, tipo.cadastroArtigo);
  };

  const retornarIdNomeUsuario = () => {
    let usuario = localStorage.getItem('login');
    usuario = JSON.parse(usuario);
    id = usuario._id;
    nome = usuario.nome;
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
