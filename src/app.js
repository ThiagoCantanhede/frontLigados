import React from 'react';
import { Link } from 'react-router-dom';

export default function App(props) {
  return (
    <div className="navbar-fixed">
      <nav className="blue " role="navigation">
        <div className="container">
          <div className="nav-wrapper">
            <a href="#" className="brand-logo">
              Logo
            </a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <a>
                  <Link to="/cadastro">Cadastrar usuário</Link>
                </a>
              </li>
              <li>
                <a>
                  <Link to="/curriculo">Cadastrar currículo</Link>
                </a>
              </li>
              <li>
                <a>
                  <Link to="/vaga">Cadastrar vaga</Link>
                </a>
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
