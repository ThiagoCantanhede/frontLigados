import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import operacoes from '../services/VagasService.js';
import operacaoesCandidatoVaga from '../services/CandidatosVagasService.js';
import operacaoesUsuarios from '../services/UsuariosService.js';

export default function ConsultarVagas(props) {
  const history = useHistory();
  const [cardsVagasAnunciadas, montarCard] = useState([]);
  let idCandidato = null;

  useEffect(async () => {
    montarCard(await montarCards());
  }, []);

  const retornarVagas = async () => {
    retornarIdUsuario();
    const vagas = await operacoes.encontrarVagasDoRecrutador(idCandidato);
    return vagas.data;
  };

  const retornarIdUsuario = () => {
    let usuario = localStorage.getItem('login');
    usuario = JSON.parse(usuario);
    idCandidato = usuario._id;
  };

  const visualizarCandidatos = async (vaga) => {
    const listaCandidatos = [];
    const listaIdsCandidatos = await operacaoesCandidatoVaga.encontrarCandidatosDaVaga(
      vaga._id
    );

    listaIdsCandidatos.map(async (l) => {
      listaCandidatos.push(await operacaoesUsuarios.get(l.usuarioId));
    });

    console.log(listaCandidatos);
  };

  const montarCards = async () => {
    const vagas = await retornarVagas();
    const teste = vagas.map((v, i) => {
      return (
        <div key={i} className="col s12 m4">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">{v.titulo}</span>
              <p>{v.descricao}</p>
            </div>
            <div className="card-action">
              <a href="#" onClick={() => visualizarCandidatos(v)}>
                Visualizar candidatos
              </a>
            </div>
          </div>
        </div>
      );
    });
    return teste;
  };

  return <div className="row container">{cardsVagasAnunciadas}</div>;
}
