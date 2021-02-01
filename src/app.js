import React from 'react';
import { Link } from 'react-router-dom';

export default function App(props) {
  return (
    <div className="navbar-fixed">
      <nav className="blue " role="navigation">
        <div className="container">
          <div className="nav-wrapper">
            <ul id="nav-mobile">
              <li>
                <Link to="/cadastro">Cadastrar usuário</Link>
              </li>
              <li>
                <Link to="/curriculo">Cadastrar currículo</Link>
              </li>
              <li>
                <Link to="/consultarCurriculos">Consultar currículos</Link>
              </li>
              <li>
                <Link to="/vaga">Cadastrar vaga</Link>
              </li>
              <li>
                <Link to="/consultarVagas">Consultar vagas</Link>
              </li>
              <li>
                <Link to="/escreverArtigo">Escrever artigo</Link>
              </li>
              <li>
                <Link to="/consultarArtigos">Listagem de artigos</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
