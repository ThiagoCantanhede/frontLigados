import React from 'react';
import operacoes from '../services/VagasService.js';
import { useHistory } from 'react-router-dom';

export default function CadastroVaga(props) {
  var nomeCompleto = '';
  var nomeUsuario = '';
  var email = '';
  var senha = '';
  var tipo = '';
  const history = useHistory();
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

  const setTipo = (event) => {
    tipo = event.target.value;
  };

  const salvarUsuario = () => {
    var usuario = {
      nome: nomeCompleto,
      nomeDeUsuario: nomeUsuario,
      password: senha,
      email: email,
      tipo: tipo,
    };
    operacoes.create(usuario);
    history.push('/');
  };
  return (
    <div className="row container">
      <form className="col s12">
        <div className="row container">
          <div className="input-field col s12"></div>
          <div className="input-field col s4"></div>
          <div className="input-field col s8">
            <input
              id="nomeCompleto"
              type="text"
              onChange={setNomeCompleto}
              className="validate"
            ></input>
            <label className="active" htmlFor="nome">
              Título
            </label>
          </div>

          <div className="input-field col s4"></div>
          <div className="input-field col s8">
            <input
              id="nomeUsuario"
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
              id="email"
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
            <select className="browser-default" onChange={setTipo}>
              <option value="" disabled selected>
                Escolha o tipo do usuário
              </option>
              <option value="recrutador">Recrutador</option>
              <option value="candidato">Candidato</option>
            </select>
            <label className="active"> Tipo de usuário</label>
          </div>

          <div className="input-field col s4"></div>
          <div className="input-field col s8">
            <input
              id="senha"
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
