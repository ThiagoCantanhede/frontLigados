import React from 'react';
import { Link } from 'react-router-dom';

export default function App(props) {
  const removerUsuarioLocalStorage = () => {
    localStorage.removeItem('login');
  };

  return (
    <div className="row container">
      <div className="col s12 m4">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">
              <Link to="/curriculo">
                <span class="white-text">Cadastrar / Editar meu currículo</span>
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
              <Link to="/minhasVagas">
                <span class="white-text">Manutenção de vaga</span>
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
              <Link to="/meusArtigos">
                <span class="white-text">Meus artigos</span>
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

      <div className="col s12 m4">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">
              <Link to="/minhasMensagens">
                <span class="white-text">Caixa de entrada</span>
              </Link>
            </span>
          </div>
        </div>
      </div>

      <div className="col s12 m4">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">
              <Link to="/grafico">
                <span class="white-text">Gráfico</span>
              </Link>
            </span>
          </div>
        </div>
      </div>

      <div className="col s12 m4">
        <div className="card red darken-1">
          <div className="card-content white-text">
            <span className="card-title">
              <Link to="/login">
                <span class="white-text" onClick={removerUsuarioLocalStorage}>
                  Sair
                </span>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
