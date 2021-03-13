import React from 'react';
import { Link } from 'react-router-dom';

export default function ComponenteDetalhesContato(props) {
  const contato = props.contato;

  return (
    <form className="col s12">
      <div className="input-field col s12">
        <input
          id="nome"
          type="text"
          value={contato ? contato.nome : ''}
          className="validate"
        ></input>
        <label className="active" htmlFor="nome">
          Nome
        </label>
      </div>

      <div className="input-field col s12">
        <input
          id="email"
          value={contato ? contato.email : ''}
          className="validate"
        ></input>
        <label className="active" htmlFor="email">
          e-mail
        </label>
      </div>

      <div className="input-field col s12">
        <input
          id="telefone"
          value={contato ? contato.telefone : ''}
          className="validate"
        ></input>
        <label className="active" htmlFor="telefone">
          Telefone
        </label>
      </div>
    </form>
  );
}
