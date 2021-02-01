import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import operacoes from '../services/CurriculoService.js';

export default function ConsultarCurriculos(props) {
  const history = useHistory();
  const [cardsCurriculos, montarCard] = useState([]);

  useEffect(async () => {
    montarCard(await montarCards());
  }, []);

  const retornarCurriculos = async () => {
    const curriculos = await operacoes.getAll();
    return curriculos.data;
  };

  const montarCards = async () => {
    const curriculos = await retornarCurriculos();
    const teste = curriculos.map((v) => {
      return (
        <div class="col s12 m4">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <span class="card-title">{v.titulo}</span>
              <p>{v.descricao}</p>
            </div>
            <div class="card-action">
              <a href="#">This is a link</a>
              <a href="#">This is a link</a>
            </div>
          </div>
        </div>
      );
    });
    return teste;
  };

  return <div className="row container">{cardsCurriculos}</div>;
}
