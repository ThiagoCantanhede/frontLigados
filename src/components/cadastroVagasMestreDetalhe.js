import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import operacoes from '../services/VagasService.js';
import operacaoesCandidatoVaga from '../services/CandidatosVagasService.js';
import operacaoesUsuarios from '../services/UsuariosService.js';

import ComponenteDetalhesVaga from './componenteDetalhesVaga';

export default function CadastroVagasMestreDetalhe(props) {
  const history = useHistory();
  const [cardsVagasAnunciadas, montarCard] = useState([]);
  const [objetoVaga, preencherObjetoVaga] = useState(null);
  let idCandidato = null;
  const vagasCandidatos = [];

  useEffect(async () => {
    montarCard(await montarCards());
  }, [objetoVaga, cardsVagasAnunciadas]);

  const retornarVagas = async () => {
    retornarIdUsuario();
    const vagas = await operacoes.encontrarVagasDoRecrutador(idCandidato);
    const vagasXCandidatos = await operacaoesCandidatoVaga.getAll();
    const candidatos = await operacaoesUsuarios.getAll();
    let cand = [];

    vagas.data.map((v) => {
      cand = [];
      vagasXCandidatos.data.map((vc) => {
        candidatos.data.map((c) => {
          if (vc.vagaId === v._id && vc.usuarioId === c._id) {
            cand.push(c);
          }
        });
      });

      const objetoVaga = {
        vaga: v,
        candidatos: cand,
      };
      vagasCandidatos.push(objetoVaga);
    });
    return vagasCandidatos;
  };

  const retornarIdUsuario = () => {
    let usuario = localStorage.getItem('login');
    usuario = JSON.parse(usuario);
    idCandidato = usuario._id;
  };

  const visualizarVaga = async (vaga) => {
    localStorage.setItem('visualisandoVaga', JSON.stringify(vaga));
    history.push('/visualizarEditarVaga');
    montarCard(await montarCards());
  };

  const excluirVaga = async (vaga) => {
    await operacoes.remove(vaga.vaga._id);
    montarCard(await montarCards());
  };

  const novaVaga = async () => {
    history.push('/vaga');
    montarCard(await montarCards());
  };

  const montarCards = async () => {
    const vagas = await retornarVagas();
    return (
      <div>
        <div className="row container col s12">
          <div className="col s2">
            <a
              class="btn-floating btn-large waves-effect waves-light"
              onClick={() => novaVaga()}
            >
              +
            </a>
          </div>
          <div className="col s5">
            <div className="collection">
              {vagas.map((v, i) => (
                <a
                  key={i}
                  className="collection-item"
                  onClick={() => preencherObjetoVaga(v)}
                >
                  <span
                    class="new badge"
                    data-badge-caption="Excluir"
                    onClick={() => excluirVaga(v)}
                  ></span>
                  <span
                    class="new badge"
                    data-badge-caption="Editar"
                    onClick={() => visualizarVaga(v)}
                  ></span>
                  {v.vaga.titulo}
                </a>
              ))}
            </div>
          </div>
          <div className="col s5">
            <ComponenteDetalhesVaga vaga={objetoVaga} />
          </div>
        </div>
      </div>
    );
  };

  return <div className="row container">{cardsVagasAnunciadas}</div>;
}
