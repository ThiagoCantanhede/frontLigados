import React, { useState, useEffect } from 'react';
import operacoes from '../services/UsuariosService.js';
import { useHistory } from 'react-router-dom';

export default function FinalizacaoCadastroUsuario(props) {
  var nomeCompleto = '';
  var nomeUsuario = '';
  var email = '';
  var senha = '';
  var tipo = '';
  var id = '';
  const history = useHistory();
  const [usarioCadastrado, montarTela] = useState([]);

  useEffect(async () => {
    montarTela(usuarioCadastro());
  }, []);

  const setTipo = (event) => {
    tipo = event.target.value;
  };

  const salvarUsuario = async () => {
    var usuario = {
      nome: nomeCompleto,
      nomeDeUsuario: nomeUsuario,
      email: email,
      password: senha,
      tipo: tipo,
    };
    await operacoes.update(id, usuario);
    sessionStorage.removeItem('login');
    sessionStorage.setItem('login', JSON.stringify(usuario));
    history.push('/');
  };

  const retornarUsuario = () => {
    let usuario = sessionStorage.getItem('login');
    usuario = JSON.parse(usuario);
    return usuario;
  };

  const usuarioCadastro = () => {
    let usuario = retornarUsuario();
    nomeUsuario = usuario.nomeDeUsuario;
    nomeCompleto = usuario.nome;
    email = usuario.email;
    id = usuario._id;
    senha = usuario.password;
    return (
      <div className="row container">
        <form className="col s12">
          <div className="row container">
            <div className="input-field col s12"></div>
            <div className="input-field col s4"></div>
            <div className="input-field col s8">
              <span className="red-text">
                Informe o tipo do usuário para finalizar o cadastro
              </span>
            </div>
            <div className="input-field col s12"></div>
            <div className="input-field col s4"></div>
            <div className="input-field col s8">
              <input
                id="nomeCompleto"
                type="text"
                value={nomeCompleto}
                readOnly
                className="validate"
              ></input>
              <label className="active" htmlFor="nome">
                Nome completo
              </label>
            </div>

            <div className="input-field col s4"></div>
            <div className="input-field col s8">
              <input
                id="nomeUsuario"
                type="text"
                value={nomeUsuario}
                readOnly
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
                value={email}
                readOnly
                className="validate"
              ></input>
              <label className="active" htmlFor="nome">
                E-mail
              </label>
            </div>

            <div className="input-field col s4"></div>
            <div className="input-field col s8">
              <select className="browser-default" onChange={setTipo}>
                <option onChange="" disabled selected>
                  Escolha o tipo do usuário
                </option>
                <option onChange="recrutador">Recrutador</option>
                <option onChange="candidato">Candidato</option>
              </select>
              <label className="active"> Tipo de usuário</label>
            </div>

            <div className="input-field col s4"></div>
            <div className="input-field col s8">
              <a
                className="waves-effect waves-light btn"
                onClick={salvarUsuario}
              >
                Salvar
              </a>
            </div>
          </div>
        </form>
      </div>
    );
  };
  return <div className="row container">{usarioCadastrado}</div>;
}
