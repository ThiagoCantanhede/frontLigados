import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import operacoes from '../services/ArtigoService.js';
import { Link } from 'react-router-dom';

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
  };

  const excluirArtigo = (artigo) => {
    operacoes.remove(artigo._id);
    history.push('/');
  };

  const retornar = () => {
    history.push('/');
  };

  const montarGrid = async () => {
    const artigos = await retornarArtigos(retornarIdUsuario());
    return (
      <div>
        <ul className="collection">
          {artigos.map((a) => (
            <li className="collection-item avatar">
              <span className="title">Título: {a.titulo}</span>
              <p>Autor: {a.autorNome}</p>
              <a href="#" onClick={() => visualizarArtigo(a)}>
                <Link to="/visualizarEditarArtigo">Ler Artigo</Link>
              </a>
              <div></div>
              <a href="#" onClick={() => excluirArtigo(a)}>
                Excluir artigo
              </a>
            </li>
          ))}
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
