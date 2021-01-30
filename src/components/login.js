import React from 'react';
import { useHistory } from 'react-router-dom';
import operacoes from '../services/UsuariosService.js';

export default function Login(props) {
  const history = useHistory();
  var nomeUsuario = '';
  var senha = '';

  const setNomeUsuario = (event) => {
    nomeUsuario = event.target.value;
  };
  const setSenha = (event) => {
    senha = event.target.value;
  };

  const login = async () => {
    try {
      const retorno = await operacoes.login(nomeUsuario, senha);
      if (retorno.data) {
        localStorage.setItem('login', JSON.stringify(retorno.data[0]));
        history.push('/');
      }
    } catch (error) {
      alert('Usuário ou senha incorreto.');
    }
  };

  return (
    <div id="login-page" class="row container">
      <div className="input-field col s12"></div>
      <div className="input-field col s3"></div>
      <div class="col s5 z-depth-4 card-panel">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12 center">
              <p className="center login-form-text">
                Informe o login para o acesso
              </p>
            </div>
          </div>
          <div className="row margin">
            <div className="input-field col s11">
              <i className="mdi-social-person-outline prefix"></i>
              <input
                id="username"
                type="text"
                onChange={setNomeUsuario}
              ></input>
              <label htmlFor="username" className="active">
                Nome de usuário
              </label>
            </div>
          </div>
          <div className="row margin">
            <div className="input-field col s11">
              <i className="mdi-action-lock-outline prefix"></i>
              <input id="password" type="password" onChange={setSenha}></input>
              <label html="password" className="active">
                senha
              </label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <a
                className="btn waves-effect waves-light col s12"
                onClick={login}
              >
                Login
              </a>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6 m6 l6">
              <p className="margin medium-small">
                <a href="page-register.html">Register Now!</a>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
