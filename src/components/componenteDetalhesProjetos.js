import React from 'react';

export default function ComponenteDetalhesProjeto(props) {
  const projeto = props.projeto;

  return (
    <form className="col s12">
      <div className="input-field col s12">
        <input
          id="nome"
          type="text"
          value={projeto ? projeto.nome : ''}
          className="validate"
        ></input>
        <label className="active" htmlFor="nome">
          Nome
        </label>
      </div>

      <div className="input-field col s12">
        <textarea
          id="descricao"
          value={projeto ? projeto.descricao : ''}
          style={{ height: 7 + 'em' }}
        ></textarea>
        <label className="active" htmlFor="descricao">
          Descrição do projeto
        </label>
      </div>

      <div className="input-field col s12">
        <input
          id="link"
          value={projeto ? projeto.link : ''}
          className="validate"
        ></input>
        <label className="active" htmlFor="link">
          Link
        </label>
      </div>
    </form>
  );
}
