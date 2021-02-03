import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import operacoes from '../services/ArtigoService.js';

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

  const montarGrid = async () => {
    const artigos = await retornarArtigos();
    return (
      <ul className="collection">
        {artigos.map((a) => (
          <li className="collection-item avatar">
            <span className="title">Título: {a.titulo}</span>
            <p>Autor: {a.autorNome}</p>
            <a href="#!" className="secondary-content">
              Ler artigo
            </a>
          </li>
        ))}
      </ul>
    );
  };

  return <div className="row container">{artigos}</div>;
}
