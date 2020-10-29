import React from 'react';
import operacoes from '../services/LigadosService.js';
export default function CadastroUsuario(props) {
  const imprime = () => {
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
    <div className="row">
      <form className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <input id="nome" type="text" className="validate"></input>
            <label className="active" htmlFor="nome">
              Nome
            </label>
          </div>
          <a className="waves-effect waves-light btn" onClick={imprime}>
            Salvar
          </a>
        </div>
      </form>
    </div>
  );
}
