import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import operacoes from '../services/UsuariosService.js';
import { Link } from 'react-router-dom';

export default function Login(props) {
  const history = useHistory();
  var nomeUsuario = '';
  var senha = '';
  var auth2 = null;
  const botaoRef = useRef(null);

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
        sessionStorage.setItem('login', JSON.stringify(retorno.data[0]));
        history.push('/');
      }
    } catch (error) {
      alert('Usuário ou senha incorreto.');
    }
  };

  const googleSDK = () => {
    window['googleSDKLoaded'] = () => {
      window['gapi'].load('auth2', () => {
        auth2 = window['gapi'].auth2.init({
          client_id:
            '1017028824525-86hhltm1ldcm3allr6g82mbsi0c383h4.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email',
        });
        prepareLoginButton();
      });
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://apis.google.com/js/platform.js?onload=googleSDKLoaded';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'google-jssdk');
  };

  const prepareLoginButton = () => {
    console.log(botaoRef);

    auth2.attachClickHandler(
      botaoRef,
      {},
      (googleUser) => {
        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE
      },
      (error) => {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  };

  googleSDK();

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
              <a
                className="btn waves-effect waves-light col s12"
                onClick={googleSDK}
              >
                start
              </a>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <a
                className="btn waves-effect waves-light col s12"
                ref={botaoRef}
              >
                Login com Google
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
