import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

export default function App(props) {
  const history = useHistory();
  const removerUsuarioLocalStorage = () => {
    sessionStorage.removeItem('login');
  };

  const retornarTipoUsuario = () => {
    let usuario = sessionStorage.getItem('login');
    usuario = JSON.parse(usuario);
    return usuario.tipo;
  };

  useEffect(async () => {
    let usuario = sessionStorage.getItem('login');
    usuario = JSON.parse(usuario);
    if (!usuario.tipo) {
      history.push('/finalUsuario');
    }
  }, []);

  return (
    <div className="row container">
      {
        <div className="col s12 m4">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">
                <Link to="/menuPessoal">
                  <span className="white-text">Minhas informações</span>
                </Link>
              </span>
            </div>
          </div>
        </div>
      }

      <div
        style={{
          display: retornarTipoUsuario() === 'Recrutador' ? 'block' : 'none',
        }}
        className="col s12 m4"
      >
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">
              <Link to="/minhasVagas">
                <span className="white-text">Cadastro de vagas</span>
              </Link>
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          display: retornarTipoUsuario() === 'Recrutador' ? 'block' : 'none',
        }}
        className="col s12 m4"
      >
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">
              <Link to="/consultarCurriculos">
                <span className="white-text">Listagem de currículos</span>
              </Link>
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          display: retornarTipoUsuario() != 'Recrutador' ? 'block' : 'none',
        }}
        className="col s12 m4"
      >
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">
              <Link to="/consultarVagas">
                <span className="white-text">Listagem de vagas</span>
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
                <span className="white-text">Listagem de artigos</span>
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
                <span
                  className="white-text"
                  onClick={removerUsuarioLocalStorage}
                >
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
