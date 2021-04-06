import React, { useState, useEffect } from 'react';
import operacoes from '../services/ContatosService.js';
import { useHistory } from 'react-router-dom';

export default function CadastrarEditarContato(props) {
  const [contato, setContato] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const history = useHistory();

  useEffect(() => {
    montarContato();
  }, [nome, email, telefone]);

  const montarContato = () => {
    let lContato = localStorage.getItem('visualisandoContato');
    lContato = JSON.parse(lContato);
    if (lContato) {
      setContato(lContato);
      if (nome === '') setNome(lContato.nome);
      if (email === '') setEmail(lContato.email);
      if (telefone === '') setTelefone(lContato.telefone);
    }
  };

  const handleNome = (event) => {
    setNome(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleTelefone = (event) => {
    setTelefone(event.target.value);
  };

  const salvarContato = () => {
    let lContato = {
      nome: nome,
      email: email,
      telefone: telefone,
      usuarioId: retornarIdUsuario(),
    };
    if (validarPreenchimento(lContato)) {
      contato
        ? operacoes.update(contato._id, lContato)
        : operacoes.create(lContato);
      history.push('/meusContatos');
    } else {
      alert(
        'Para salvar, é necessário informar todos os dados do contato. Verifique!'
      );
    }
  };

  const validarPreenchimento = (contato) => {
    return contato.nome && contato.email && contato.telefone ? true : false;
  };

  const retornarIdUsuario = () => {
    let usuario = sessionStorage.getItem('login');
    usuario = JSON.parse(usuario);
    return usuario._id;
  };

  const retornar = () => {
    history.push('/meusContatos');
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
            <input
              id="email"
              type="text"
              value={email}
              onChange={handleEmail}
              className="validate"
            ></input>
            <label className="active" htmlFor="email">
              e-mail
            </label>
          </div>

          <div className="input-field col s4"></div>
          <div className="input-field col s8">
            <input
              id="telefone"
              type="text"
              value={telefone}
              onChange={handleTelefone}
              className="validate"
            ></input>
            <label className="active" htmlFor="telefone">
              Telefone
            </label>
          </div>

          <div className="input-field col s4"></div>
          <div className="input-field col s2">
            <a className="waves-effect waves-light btn" onClick={salvarContato}>
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
