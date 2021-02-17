import React, { useState, useEffect } from 'react';
import operacoes from '../services/MensagemService.js';
import { useHistory } from 'react-router-dom';

export default function VisualizarMensagem(props) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const history = useHistory();

  useEffect(() => {
    montarMensagem();
  }, [titulo, descricao]);

  const montarMensagem = () => {
    let mensagem = localStorage.getItem('visualizarMensagem');
    mensagem = JSON.parse(mensagem);
    if (titulo === '') setTitulo(mensagem.assunto);
    if (descricao === '') setDescricao(mensagem.mensagem);
  };

  const voltar = () => {
    history.push('/minhasMensagens');
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
              value={titulo}
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
              value={descricao}
              style={{ height: 40 + 'em' }}
            ></textarea>
            <label className="active" htmlFor="descricao">
              Mensagem
            </label>
          </div>

          <div className="input-field col s4"></div>
          <div className="input-field col s8">
            <a className="waves-effect waves-light btn" onClick={voltar}>
              Voltar
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
