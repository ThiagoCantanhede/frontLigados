import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import operacoes from '../services/VagasService.js';
import operacaoesCandidatoVaga from '../services/CandidatosVagasService.js';
import operacaoesUsuarios from '../services/UsuariosService.js';
import { Link } from 'react-router-dom';

export default function MinhasVagas(props) {
  const history = useHistory();
  const [cardsVagasAnunciadas, montarCard] = useState([]);
  let idCandidato = null;
  const vagasCandidatos = [];
  let objetoVaga = {
    vaga: null,
    candidatos: null,
  };

  useEffect(async () => {
    montarCard(await montarCards());
  }, []);

  const retornarVagas = async () => {
    retornarIdUsuario();
    const vagas = await operacoes.encontrarVagasDoRecrutador(idCandidato);
    const vagasXCandidatos = await operacaoesCandidatoVaga.getAll();
    const candidatos = await operacaoesUsuarios.getAll();
    const cand = [];

    vagas.data.map((v) => {
      vagasXCandidatos.data.map((vc) => {
        candidatos.data.map((c) => {
          if (vc.vagaId === v._id && vc.usuarioId === c._id) {
            cand.push(c);
          }
        });
      });
      objetoVaga.vaga = v;
      objetoVaga.candidatos = cand;
      vagasCandidatos.push(objetoVaga);
    });
    return vagasCandidatos;
  };

  const retornarIdUsuario = () => {
    let usuario = localStorage.getItem('login');
    usuario = JSON.parse(usuario);
    idCandidato = usuario._id;
  };

  const visualizarCandidatos = async (vaga) => {
    const listaCandidatos = [];
    let candidato = null;
    const listaIdsCandidatos = await operacaoesCandidatoVaga.encontrarCandidatosDaVaga(
      vaga._id
    );

    listaIdsCandidatos.data.map(async (l) => {
      candidato = await operacaoesUsuarios.get(l.usuarioId);
      listaCandidatos.push(candidato.data);
    });

    return listaCandidatos;
  };

  const abrirCurriculo = (candidato) => {
    localStorage.setItem('visualisandoCandidato', candidato._id);
  };

  const montarCards = async () => {
    const vagas = await retornarVagas();
    const teste = vagas.map((v, i) => {
      console.log(v);
      return (
        <div key={i} className="col s12 m4">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">{v.vaga.titulo}</span>
              <span>CANDIDATOS:</span>
              {v.candidatos.map((c) => {
                return (
                  <p>
                    <a href="#" onClick={() => abrirCurriculo(c)}>
                      <Link to="/candidato">
                        {c.nome} - {c.email}
                      </Link>
                    </a>
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      );
    });
    return teste;
  };

  return <div className="row container">{cardsVagasAnunciadas}</div>;
}
