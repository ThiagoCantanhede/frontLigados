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
    let usuario = localStorage.getItem('login');
    usuario = JSON.parse(usuario);
    return usuario._id;
  };

  const visualizarMensagem = (mensagem) => {
    localStorage.setItem('visualizarMensagem', JSON.stringify(mensagem));
  };

  const montarGrid = async () => {
    const mensagens = await retornarMensagens(retornarIdUsuario());
    return (
      <ul className="collection">
        {mensagens.map((m) => (
          <li className="collection-item avatar">
            <span className="title">Assunto: {m.assunto}</span>
            <p>Enviado por: {m.nomeAutor}</p>
            <a href="#" onClick={() => visualizarMensagem(m)}>
              <Link to="/visualizarMensagem">Ler mensagem</Link>
            </a>
            <div></div>
          </li>
        ))}
      </ul>
    );
  };

  return <div className="row container">{mensagens}</div>;
}
