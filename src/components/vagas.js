import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import operacoes from '../services/VagasService.js';

export default function ConsultarVagas(props) {
  const history = useHistory();
  const [cardsVagasAnunciadas, montarCard] = useState([]);

  useEffect(async () => {
    montarCard(await montarCards());
  }, []);

  const retornarVagas = async () => {
    const vagas = await operacoes.getAll();
    return vagas.data;
  };

  const montarCards = async () => {
    const vagas = await retornarVagas();
    const teste = vagas.map((v) => {
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

  return <div className="row container">{cardsVagasAnunciadas}</div>;
}
