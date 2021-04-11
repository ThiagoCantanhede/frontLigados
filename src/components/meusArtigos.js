import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import operacoes from '../services/ArtigoService.js';

export default function MeusArtigos(props) {
  const history = useHistory();
  const [artigos, montar] = useState([]);

  useEffect(async () => {
    montar(await montarGrid());
  }, []);

  const retornarArtigos = async (autor) => {
    const artigos = await operacoes.encontrarArtigosDoAutor(autor);
    return artigos.data;
  };

  const retornarIdUsuario = () => {
    let usuario = sessionStorage.getItem('login');
    usuario = JSON.parse(usuario);
    return usuario._id;
  };

  const visualizarArtigo = (artigo) => {
    localStorage.setItem('visualisandoArtigo', JSON.stringify(artigo));
    history.push('/visualizarEditarArtigo');
  };

  const excluirArtigo = (artigo) => {
    operacoes.remove(artigo._id);
    history.push('/');
  };

  const retornar = () => {
    history.push('/gerenciamentoArtigos');
  };

  const montarGrid = async () => {
    const artigos = await retornarArtigos(retornarIdUsuario());
    return (
      <div>
        <ul className="collection">
          {artigos.length ? (
            artigos.map((a, index) => (
              <li key={index} className="collection-item avatar">
                <span className="title">Título: {a.titulo}</span>
                <p>Autor: {a.autorNome}</p>
                <a href="#" onClick={() => visualizarArtigo(a)}>
                  Ler Artigo
                </a>
                <div></div>
                <a href="#" onClick={() => excluirArtigo(a)}>
                  Excluir artigo
                </a>
              </li>
            ))
          ) : (
            <div className="input-field col s12 center">
              <p>Nenhum dado para exibir</p>
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

  return <div className="row container">{artigos}</div>;
}
