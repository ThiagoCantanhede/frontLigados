import React from 'react';
import operacoes from '../services/LigadosService.js';
export default function CadastroUsuario(props) {
  const salvarUsuario = () => {
    console.log('teste');
    var usuario = {
      nome: 'usuário do frontend',
      nomeDeUsuario: 'usuFront',
      password: '123456',
      tipo: 'Candidato Front',
    };
    operacoes.create(usuario);
  };
  return (
    <div className="row container">
      <form className="col s12">
        <div className="row container">
          <div className="input-field col s12"></div>
          <div className="input-field col s4"></div>
          <div className="input-field col s8">
            <input id="nome" type="text" className="validate"></input>
            <label className="active" htmlFor="nome">
              Nome completo
            </label>
          </div>

          <div className="input-field col s4"></div>
          <div className="input-field col s8">
            <input id="nome" type="text" className="validate"></input>
            <label className="active" htmlFor="nome">
              Nome de usuário
            </label>
          </div>

          <div className="input-field col s4"></div>
          <div className="input-field col s8">
            <input id="nome" type="text" className="validate"></input>
            <label className="active" htmlFor="nome">
              E-mail
            </label>
          </div>
          <div className="input-field col s4"></div>
          <div className="input-field col s8">
            <input id="nome" type="text" className="validate"></input>
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
