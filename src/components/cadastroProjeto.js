import React, { useState, useEffect } from 'react';
import operacoes from '../services/ProjetosService.js';
import { useHistory } from 'react-router-dom';

export default function CadastrarEditarProjeto(props) {
  const [projeto, setProjeto] = useState(null);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [linkp, setLinkp] = useState('');
  const history = useHistory();

  useEffect(() => {
    montarProjeto();
  }, [nome, descricao, linkp]);

  const montarProjeto = () => {
    let lProjeto = localStorage.getItem('visualisandoProjeto');
    lProjeto = JSON.parse(lProjeto);
    if (lProjeto) {
      setProjeto(lProjeto);
      if (nome === '') setNome(lProjeto.nome);
      if (descricao === '') setDescricao(lProjeto.descricao);
      if (linkp === '') setLinkp(lProjeto.link);
    }
  };

  const handleNome = (event) => {
    setNome(event.target.value);
  };
  const handleDescricao = (event) => {
    setDescricao(event.target.value);
  };
  const handleLinkp = (event) => {
    setLinkp(event.target.value);
  };

  const salvarProjeto = () => {
    let lProjeto = {
      nome: nome,
      descricao: descricao,
      link: linkp,
      usuarioId: retornarIdUsuario(),
    };

    if (validarPreenchimento(lProjeto)) {
      projeto
        ? operacoes.update(projeto._id, lProjeto)
        : operacoes.create(lProjeto);
      history.push('/meusProjetos');
    } else {
      alert(
        'Para salvar, é necessário informar todos os dados do projeto. Verifique!'
      );
    }
  };

  const validarPreenchimento = (projeto) => {
    return projeto.nome && projeto.descricao && projeto.link ? true : false;
  };

  const retornarIdUsuario = () => {
    let usuario = sessionStorage.getItem('login');
    usuario = JSON.parse(usuario);
    return usuario._id;
  };

  const retornar = () => {
    history.push('/meusProjetos');
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
              value={nome}
              onChange={handleNome}
              className="validate"
            ></input>
            <label className="active" htmlFor="nome">
              Nome
            </label>
          </div>

          <div className="input-field col s4"></div>
          <div className="input-field col s8">
            <textarea
              id="descricao"
              value={descricao}
              onChange={handleDescricao}
              style={{ height: 7 + 'em' }}
            ></textarea>
            <label className="active" htmlFor="descricao">
              Descrição do projeto
            </label>
          </div>

          <div className="input-field col s4"></div>
          <div className="input-field col s8">
            <input
              id="link"
              type="text"
              value={linkp}
              onChange={handleLinkp}
              className="validate"
            ></input>
            <label className="active" htmlFor="link">
              Link para o repositório do projeto
            </label>
          </div>

          <div className="input-field col s4"></div>
          <div className="input-field col s2">
            <a className="waves-effect waves-light btn" onClick={salvarProjeto}>
              Salvar
            </a>
          </div>

          <div className="input-field col s2">
            <a className="waves-effect waves-light btn" onClick={retornar}>
              Cancelar
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
