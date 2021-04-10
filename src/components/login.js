import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import operacoes from '../services/UsuariosService.js';
import { Link } from 'react-router-dom';

export default function Login(props) {
  const history = useHistory();
  const [carregando, alterarCarregando] = useState(false);
  const [nomeUsuario, preencheNome] = useState('');
  const [senha, preencheSenha] = useState('');

  const setNomeUsuario = (event) => {
    preencheNome(event.target.value);
  };
  const setSenha = (event) => {
    preencheSenha(event.target.value);
  };

  useEffect(() => {}, [carregando]);

  const login = async () => {
    try {
      alterarCarregando(true);
      const retorno = await operacoes.login(nomeUsuario, senha);
      if (retorno.data) {
        sessionStorage.setItem('login', JSON.stringify(retorno.data[0]));

        history.push('/');
      }
    } catch (error) {
      alert('Usuário ou senha incorreto.');
      alterarCarregando(false);
    }
  };

  return (
    <div id="login-page" className="row container">
      <div className="input-field col s12"></div>
      <div className="input-field col s3"></div>
      <div className="col s5 z-depth-4 card-panel">
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
          <div
            style={{
              display: carregando === true ? 'block' : 'none',
            }}
            class="progress"
          >
            <div class="indeterminate"></div>
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
            <div className="input-field col s12">
              <a className="btn waves-effect waves-light col s12">
                <Link to="/loginGoogle">
                  <span class="white-text">Login com Google</span>
                </Link>
              </a>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6 m6 l6">
              <p className="margin medium-small">
                <a href="page-register.html">
                  <Link to="/cadastro">Cadastrar novo usuário</Link>
                </a>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
