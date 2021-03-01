import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import operacoes from '../services/CurriculoService.js';
import { Link } from 'react-router-dom';
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

  const retornarUsuario = () => {
    let usuario = localStorage.getItem('login');
    return usuario;
  };

  const montarCards = async () => {
    const curriculos = await retornarCurriculos();
    return (
      <ul className="collection">
        {curriculos.map((c, i) => (
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
        ))}
      </ul>
    );
  };

  return <div className="row container">{cardsCurriculos}</div>;
}
