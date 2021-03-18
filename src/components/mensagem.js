import React from 'react';
import operacoes from '../services/MensagemService.js';
import { useHistory } from 'react-router-dom';
import tipos from '../tipos.js';
import salvarAuditoria from '../auditoria.js';

export default function Mensagem(props) {
  var titulo = '';
  var descricao = '';
  var nome = '';
  var id = '';
  var idDestinatario = '';
  var nomeDestinatario;

  const history = useHistory();
  const setTitulo = (event) => {
    titulo = event.target.value;
  };
  const setDescricao = (event) => {
    descricao = event.target.value;
  };

  const enviarMensagem = () => {
    retornarIdNomeUsuario();
    retornarIdNomeDestinatario();
    var mensagem = {
      destinatarioId: idDestinatario,
      nomeDestinatario: nomeDestinatario,
      autorId: id,
      nomeAutor: nome,
      assunto: titulo,
      mensagem: descricao,
    };
    operacoes.create(mensagem);
    salvarNaAuditoria();
    history.push('/candidato');
  };

  const salvarNaAuditoria = async () => {
    let tipo = new tipos();
    let auditoria = new salvarAuditoria();
    auditoria.salvarAuditoria(id, tipo.mensagem);
  };

  const retornarIdNomeUsuario = () => {
    let usuario = sessionStorage.getItem('login');
    usuario = JSON.parse(usuario);
    id = usuario._id;
    nome = usuario.nome;
  };

  const retornarIdNomeDestinatario = () => {
    let candidato = localStorage.getItem('visualisandoCandidato');
    candidato = JSON.parse(candidato);
    idDestinatario = candidato._id;
    nomeDestinatario = candidato.nome;
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
              Assunto
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
              Mensagem
            </label>
          </div>

          <div className="input-field col s4"></div>
          <div className="input-field col s8">
            <a
              className="waves-effect waves-light btn"
              onClick={enviarMensagem}
            >
              Enviar
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
