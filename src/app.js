import React from 'react';
import { Link } from 'react-router-dom';
export default function App(props) {
  return (
    <div class="navbar-fixed">
      <nav class="blue " role="navigation">
        <div class="container">
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
                <a href="">Vagas</a>
              </li>
              <li>
                <a href="">Artigos</a>
              </li>
              <li>
                <a href="">Editar perfil</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
