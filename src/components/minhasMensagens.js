import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import operacoes from '../services/MensagemService.js';
import { Link } from 'react-router-dom';

export default function MinhasMensagens(props) {
  const history = useHistory();
  const [mensagens, montar] = useState([]);

  useEffect(async () => {
    montar(await montarGrid());
  }, []);

  const retornarMensagens = async (destinatario) => {
    const mensagens = await operacoes.encontrarMensagemPorDestinatario(
      destinatario
    );
    return mensagens.data;
  };

  const retornarIdUsuario = () => {
    let usuario = sessionStorage.getItem('login');
    usuario = JSON.parse(usuario);
    return usuario._id;
  };

  const visualizarMensagem = (mensagem) => {
    localStorage.setItem('visualizarMensagem', JSON.stringify(mensagem));
  };

  const retornar = () => {
    history.push('/');
  };

  const montarGrid = async () => {
    const mensagens = await retornarMensagens(retornarIdUsuario());
    return (
      <div>
        <ul className="collection">
          {mensagens.length ? (
            mensagens.map((m) => (
              <li className="collection-item avatar">
                <span className="title">Assunto: {m.assunto}</span>
                <p>Enviado por: {m.nomeAutor}</p>
                <a href="#" onClick={() => visualizarMensagem(m)}>
                  <Link to="/visualizarMensagem">Ler mensagem</Link>
                </a>
                <div></div>
              </li>
            ))
          ) : (
            <div className="input-field col s12 center">
              <p>Nenhuma mensagem para exibir</p>
            </div>
          )}
        </ul>
        <div className="input-field col s1">
          <a className="waves-effect waves-light btn" onClick={retornar}>
            Fechar
          </a>
        </div>
      </div>
    );
  };

  return <div className="row container">{mensagens}</div>;
}
