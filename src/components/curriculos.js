import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import operacoes from '../services/CurriculoService.js';
import operacaoesUsuarios from '../services/UsuariosService.js';

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

  const abrirCurriculo = async (curriculo) => {
    let usu = await retornarUsuarioCurriculo(curriculo.usuarioId);
    localStorage.setItem('visualisandoCandidato', JSON.stringify(usu.data));
    history.push('/candidato');
  };

  const retornarUsuarioCurriculo = async (id) => {
    const candidato = await operacaoesUsuarios.get(id);
    return candidato;
  };

  const retornar = () => {
    history.push('/');
  };

  const montarCards = async () => {
    const curriculos = await retornarCurriculos();
    return (
      <div>
        <ul className="collection">
          {curriculos.length ? (
            curriculos.map((c, i) => (
              <li key={i} className="collection-item avatar">
                <span className="title">Currículo</span>
                <p>Nome: {c.usuarioNome}</p>
                <a
                  href="#!"
                  className="secondary-content"
                  onClick={() => abrirCurriculo(c)}
                >
                  Visualizar currículo
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

  return <div className="row container">{cardsCurriculos}</div>;
}
