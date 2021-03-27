import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import operacoes from '../services/VagasService.js';
import operacaoesCandidatoVaga from '../services/CandidatosVagasService.js';
import { Link } from 'react-router-dom';
import tipos from '../tipos.js';
import salvarAuditoria from '../auditoria.js';

export default function ConsultarVagas(props) {
  const history = useHistory();
  const [cardsVagasAnunciadas, montarCard] = useState([]);
  const [codigoBusca, setCodigoBusca] = useState(null);
  let idCandidato = null;

  useEffect(async () => {
    montarCard(await montarCards());
  }, [cardsVagasAnunciadas]);

  const retornarVagas = async () => {
    const vagas = codigoBusca
      ? await operacoes.encontrarVagaPorCodigo(codigoBusca)
      : await operacoes.getAll();
    return vagas.data;
  };

  const checarSeUsuarioJaSeCandidatouAVaga = async (idVaga) => {
    const candidatos = await operacaoesCandidatoVaga.encontrarCandidatosDaVaga(
      idVaga
    );
    const candidato = candidatos.data.find((c) => c.usuarioId === idCandidato);
    return candidato ? true : false;
  };

  const salvarNaAuditoria = async () => {
    let tipo = new tipos();
    let auditoria = new salvarAuditoria();
    auditoria.salvarAuditoria(idCandidato, tipo.candidatura);
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
        salvarNaAuditoria();
        alert('Candidatura realizada!');
      } catch (error) {
        console.log(error.message);
      }
    } else {
      alert('Candidatura não realizada. Você já se candidatou a vaga!');
    }
  };

  const retornarIdUsuario = () => {
    let usuario = sessionStorage.getItem('login');
    usuario = JSON.parse(usuario);
    idCandidato = usuario._id;
  };

  const visualizarVaga = (vaga) => {
    localStorage.setItem('visualisandoVaga', JSON.stringify(vaga));
  };

  const buscarVaga = async () => {
    setCodigoBusca(document.getElementById('pesquisa').value);
  };

  const restaurar = () => {
    document.getElementById('pesquisa').value = null;
    setCodigoBusca(null);
  };

  const retornar = () => {
    history.push('/');
  };

  const montarCards = async () => {
    const vagas = await retornarVagas();
    return (
      <div>
        <div className="row container col s12">
          <div className="row container col s4">
            <label className="active" htmlFor="titulo">
              Pesquisar código
            </label>
            <input id="pesquisa" type="text" className="validate"></input>
          </div>
          <div className="input-field col s1">
            <a className="blue-grey darken-1 btn" onClick={buscarVaga}>
              Buscar
            </a>
          </div>
          <div className="input-field col s2">
            <a className="blue-grey darken-1 btn" onClick={restaurar}>
              Restaurar padrões
            </a>
          </div>
          <div className="input-field col s1">
            <a className="blue-grey darken-1 btn" onClick={retornar}>
              Fechar
            </a>
          </div>
        </div>
        <div className="row container col s12">
          {vagas.length > 0 ? (
            vagas.map((v, i) => (
              <div key={i} className="col s12 m4">
                <div className="card blue-grey darken-1">
                  <div className="card-content white-text">
                    <span className="card-title">{v.titulo}</span>
                    <p>Código: {v.codigo}</p>
                    <p>Descrição: {v.descricao}</p>
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
            ))
          ) : (
            <div className="input-field col s12 center">
              <p>Nenhum dado para exibir</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return <div className="row container">{cardsVagasAnunciadas}</div>;
}
