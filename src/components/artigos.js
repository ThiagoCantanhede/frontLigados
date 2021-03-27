import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import operacoes from '../services/ArtigoService.js';
import { Link } from 'react-router-dom';

export default function ConsultarArtigos(props) {
  const history = useHistory();
  const [artigos, montar] = useState([]);

  useEffect(async () => {
    montar(await montarGrid());
  }, []);

  const retornarArtigos = async () => {
    const artigos = await operacoes.getAll();
    return artigos.data;
  };

  const visualizarArtigo = (artigo) => {
    localStorage.setItem('visualisandoArtigo', JSON.stringify(artigo));
  };

  const retornar = () => {
    history.push('/');
  };

  const montarGrid = async () => {
    const artigos = await retornarArtigos();
    return (
      <div>
        <ul className="collection">
          {artigos.length ? (
            artigos.map((a) => (
              <li className="collection-item avatar">
                <span className="title">Título: {a.titulo}</span>
                <p>Autor: {a.autorNome}</p>
                <a href="#" onClick={() => visualizarArtigo(a)}>
                  <Link to="/visualizarArtigo">Ler Artigo</Link>
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
