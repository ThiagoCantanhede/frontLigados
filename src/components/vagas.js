import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import operacoes from '../services/VagasService.js';
import operacaoesCandidatoVaga from '../services/CandidatosVagasService.js';
import { Link } from 'react-router-dom';

export default function ConsultarVagas(props) {
  const history = useHistory();
  const [cardsVagasAnunciadas, montarCard] = useState([]);
  let idCandidato = null;

  useEffect(async () => {
    montarCard(await montarCards());
  }, []);

  const retornarVagas = async () => {
    const vagas = await operacoes.getAll();
    return vagas.data;
  };

  const checarSeUsuarioJaSeCandidatouAVaga = async (idVaga) => {
    const candidatos = await operacaoesCandidatoVaga.encontrarCandidatosDaVaga(
      idVaga
    );
    const candidato = candidatos.data.find((c) => c.usuarioId === idCandidato);
    return candidato ? true : false;
  };

  const salvarCandidatura = async (v) => {
    retornarIdUsuario();
    if (!(await checarSeUsuarioJaSeCandidatouAVaga(v._id))) {
      const candidatura = {
        vagaId: v._id,
        usuarioId: idCandidato,
      };
      try {
        await operacaoesCandidatoVaga.create(candidatura);
        alert('Candidatura realizada!');
      } catch (error) {
        console.log(error.message);
      }
    } else {
      alert('Candidatura não realizada. Você já se candidatou a vaga!');
    }
  };

  const retornarIdUsuario = () => {
    let usuario = localStorage.getItem('login');
    usuario = JSON.parse(usuario);
    idCandidato = usuario._id;
  };

  const visualizarVaga = (vaga) => {
    localStorage.setItem('visualisandoVaga', JSON.stringify(vaga));
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
              <a href="#" onClick={() => salvarCandidatura(v)}>
                candidatar-se
              </a>
              <a href="#" onClick={() => visualizarVaga(v)}>
                <Link to="/visualizarVaga">Visualizar vaga</Link>
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
