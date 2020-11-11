import React from 'react';
import operacoes from '../services/LigadosService.js';
export default function CadastroUsuario(props) {
  var nomeCompleto = '';
  var nomeUsuario = '';
  var email = '';
  var senha = '';

  const setNomeCompleto = (event) => {
    nomeCompleto = event.target.value;
  };
  const setNomeUsuario = (event) => {
    nomeUsuario = event.target.value;
  };

  const setEmail = (event) => {
    email = event.target.value;
  };

  const setSenha = (event) => {
    senha = event.target.value;
  };

  const salvarUsuario = () => {
    var usuario = {
      nome: nomeCompleto,
      nomeDeUsuario: nomeUsuario,
      password: senha,
      email: email,
    };
    console.log(usuario);
    operacoes.create(usuario);
  };
  return (
    <div className="row container">
      <form className="col s12">
        <div className="row container">
          <div className="input-field col s12"></div>
          <div className="input-field col s4"></div>
          <div className="input-field col s8">
            <input
              id="nome"
              type="text"
              onChange={setNomeCompleto}
              className="validate"
            ></input>
            <label className="active" htmlFor="nome">
              Nome completo
            </label>
          </div>

          <div className="input-field col s4"></div>
          <div className="input-field col s8">
            <input
              id="nome"
              type="text"
              onChange={setNomeUsuario}
              className="validate"
            ></input>
            <label className="active" htmlFor="nome">
              Nome de usuário
            </label>
          </div>

          <div className="input-field col s4"></div>
          <div className="input-field col s8">
            <input
              id="nome"
              type="text"
              onChange={setEmail}
              className="validate"
            ></input>
            <label className="active" htmlFor="nome">
              E-mail
            </label>
          </div>
          <div className="input-field col s4"></div>
          <div className="input-field col s8">
            <input
              id="nome"
              type="text"
              onChange={setSenha}
              className="validate"
            ></input>
            <label className="active" htmlFor="nome">
              Senha
            </label>
          </div>
          <div className="input-field col s4"></div>
          <div className="input-field col s8">
            <a className="waves-effect waves-light btn" onClick={salvarUsuario}>
              Salvar
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
