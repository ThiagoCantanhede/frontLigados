import React, { Component } from 'react';
import operacoes from '../services/UsuariosService.js';

class GoogleLogin extends Component {
  state = {
    loginData: {
      Token: '',
    },
  };

  componentDidMount() {
    this.googleSDK();
  }

  async gerenciarUsuario(profile) {
    if (!(await this.efetuarLogin(profile))) {
      await this.cadastrarUsuario(profile);
      await this.efetuarLogin(profile);
    }
    this.props.history.push('/');
  }

  async efetuarLogin(profile) {
    try {
      const retorno = await operacoes.login(
        profile.getEmail(),
        profile.getId()
      );
      if (retorno.data) {
        sessionStorage.setItem('login', JSON.stringify(retorno.data[0]));
        return true;
      }
    } catch (error) {
      return;
    }
  }

  async cadastrarUsuario(profile) {
    var usuario = {
      nome: profile.getName(),
      nomeDeUsuario: profile.getEmail(),
      password: profile.getId(),
      email: profile.getEmail(),
      tipo: null,
    };
    await operacoes.create(usuario);
  }

  prepareLoginButton = () => {
    this.auth2.attachClickHandler(
      this.refs.googleLoginBtn,
      {},
      (googleUser) => {
        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());

        this.gerenciarUsuario(profile);

        this.setState({
          loginData: {
            Token: googleUser.getAuthResponse().id_token,
            ID: profile.getId(),
            Name: profile.getName(),
            Image: profile.getImageUrl(),
            Email: profile.getEmail(),
          },
        });
      },
      (error) => {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  };

  googleSDK = () => {
    window['googleSDKLoaded'] = () => {
      window['gapi'].load('auth2', () => {
        this.auth2 = window['gapi'].auth2.init({
          client_id:
            '1017028824525-86hhltm1ldcm3allr6g82mbsi0c383h4.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email',
        });
        this.prepareLoginButton();
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

  render() {
    return (
      <div className="row mt-5">
        <div className="col-md-12">
          <div className="card mt-3">
            <div className="card-body">
              {this.state.loginData.ID ? (
                <p>
                  <b>Response</b>
                  <p>
                    <b>ID:</b>
                    {this.state.loginData.ID}
                  </p>
                  <p>
                    <b>Name:</b>
                    {this.state.loginData.Name}
                  </p>
                  <p>
                    <b>Email:</b>
                    {this.state.loginData.Email}
                  </p>
                  <p>
                    <b>Image:</b>
                    {this.state.loginData.Image}
                  </p>
                </p>
              ) : null}

              <div className="row mt-5 mb-5">
                <div className="col-md-4 mt-2 m-auto ">
                  <div className="row container">
                    <div className="input-field col s12"></div>
                    <div className="input-field col s4"></div>
                    <div className="input-field col s8">
                      <button
                        className="waves-effect waves-light btn"
                        ref="googleLoginBtn"
                      >
                        Clique para realizar o login com o Google
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GoogleLogin;
