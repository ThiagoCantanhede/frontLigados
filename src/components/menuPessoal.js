import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

export default function MenuPessoal(props) {
  const history = useHistory();

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
      <div
        style={{
          display: retornarTipoUsuario() != 'Recrutador' ? 'block' : 'none',
        }}
        className="col s12 m4"
      >
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">
              <Link to="/curriculo">
                <span className="white-text">
                  Cadastrar / Editar meu currículo
                </span>
              </Link>
            </span>
          </div>
        </div>
      </div>

      <div className="col s12 m4">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">
              <Link to="/gerenciamentoArtigos">
                <span className="white-text">Artigos</span>
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
                <span className="white-text">Caixa de entrada</span>
              </Link>
            </span>
          </div>
        </div>
      </div>

      <div className="col s12 m4">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">
              <Link to="/meusContatos">
                <span className="white-text">Cadastro de contatos</span>
              </Link>
            </span>
          </div>
        </div>
      </div>

      <div className="col s12 m4">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">
              <Link to="/meusProjetos">
                <span className="white-text">Cadastro de projetos</span>
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
              <Link to="/graficos">
                <span className="white-text">Estatísticas pessoais</span>
              </Link>
            </span>
          </div>
        </div>
      </div>

      <div className="col s12 m4">
        <div className="card red darken-1">
          <div className="card-content white-text">
            <span className="card-title">
              <Link to="/">
                <span className="white-text">Tela inicial</span>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
