import React from 'react';
import { Link } from 'react-router-dom';

export default function App(props) {
  return (
    // <div className="navbar-fixed">
    //   <nav className="blue " role="navigation">
    //     <div className="container">
    //       <div className="nav-wrapper">
    //         <ul id="nav-mobile">
    //           <li>
    //             <Link to="/cadastro">Cadastrar usuário</Link>
    //           </li>
    //           <li>
    //             <Link to="/curriculo">Cadastrar currículo</Link>
    //           </li>
    //           <li>
    //             <Link to="/consultarCurriculos">Listagem de currículos</Link>
    //           </li>
    //           <li>
    //             <Link to="/vaga">Cadastrar vaga</Link>
    //           </li>
    //           <li>
    //             <Link to="/consultarVagas">Listagem de vagas</Link>
    //           </li>
    //           <li>
    //             <Link to="/escreverArtigo">Escrever artigo</Link>
    //           </li>
    //           <li>
    //             <Link to="/consultarArtigos">Listagem de artigos</Link>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </nav>
    // </div>
    <div className="row container">
      <div className="col s12 m4">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">
              <Link to="/cadastro">
                <span class="white-text">Cadastrar usuário</span>
              </Link>
            </span>
          </div>
        </div>
      </div>

      <div className="col s12 m4">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">
              <Link to="/curriculo">
                <span class="white-text">Cadastrar currículo</span>
              </Link>
            </span>
          </div>
        </div>
      </div>

      <div className="col s12 m4">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">
              <Link to="/consultarCurriculos">
                <span class="white-text">Listagem de currículos</span>
              </Link>
            </span>
          </div>
        </div>
      </div>

      <div className="col s12 m4">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">
              <Link to="/vaga">
                <span class="white-text">Cadastrar vaga</span>
              </Link>
            </span>
          </div>
        </div>
      </div>

      <div className="col s12 m4">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">
              <Link to="/consultarVagas">
                <span class="white-text">Listagem de vagas</span>
              </Link>
            </span>
          </div>
        </div>
      </div>

      <div className="col s12 m4">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">
              <Link to="/escreverArtigo">
                <span class="white-text">Escrever artigo</span>
              </Link>
            </span>
          </div>
        </div>
      </div>

      <div className="col s12 m4">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">
              <Link to="/consultarArtigos">
                <span class="white-text">Listagem de artigos</span>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
