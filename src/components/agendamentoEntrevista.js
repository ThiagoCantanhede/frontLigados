import React, { useState, useEffect } from 'react';
import operacoes from '../services/AgendamentoService.js';
import { useHistory } from 'react-router-dom';
import salvarAuditoria from '../auditoria.js';

export default function Agendamento(props) {
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [mensagem, setMensagem] = useState('');
  const history = useHistory();

  useEffect(() => {}, [data, hora, mensagem]);

  const salvarAgendamento = () => {
    console.log(hora);
    console.log(data);
    var agendamento = {
      recrutadorId: retornarIdRecrutador(),
      candidatoId: 'idCandidato',
      horario: hora,
      dia: '2',
      mes: '2',
      ano: '2021',
      mensagem: mensagem,
    };

    operacoes.create(agendamento);
    //salvarNaAuditoria();
    retornar();
  };

  // const salvarNaAuditoria = async () => {
  //   let tipo = new tipos();
  //   let auditoria = new salvarAuditoria();
  //   auditoria.salvarAuditoria(id, tipo.cadastroCurriculo);
  // };

  const retornarIdRecrutador = () => {
    let usuario = sessionStorage.getItem('login');
    usuario = JSON.parse(usuario);
    return usuario._id;
  };

  const handle = (event) => {
    if (event.target.id == 'data') {
      setData(event.target.value);
    }
    if (event.target.id == 'hora') {
      setHora(event.target.value);
    }
    if (event.target.id == 'mensagem') {
      setMensagem(event.target.value);
    }
  };

  const retornar = () => {
    history.push('/');
  };

  return (
    <div className="row container">
      <form className="col s12">
        <div className="input-field col s12"></div>
        <div className="input-field col s12">
          <input
            id="data"
            pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}"
            onChange={handle}
            value={data}
            type="date"
          ></input>
          <label className="active" htmlFor="data">
            Data
          </label>
        </div>

        <div className="input-field col s12">
          <input id="hora" type="time" onChange={handle} value={hora}></input>
          <label className="active" htmlFor="hora">
            Hora
          </label>
        </div>

        <div className="input-field col s12">
          <textarea
            id="mensagem"
            onChange={handle}
            value={mensagem}
            style={{ height: 7 + 'em' }}
          ></textarea>
          <label className="active" htmlFor="mensagem">
            Mensagem para o candidato
          </label>
        </div>

        <div className="input-field col s1">
          <a
            className="waves-effect waves-light btn"
            onClick={salvarAgendamento}
          >
            Salvar
          </a>
        </div>
        <div className="input-field col s1">
          <a className="waves-effect waves-light btn" onClick={retornar}>
            Cancelar
          </a>
        </div>
      </form>
    </div>
  );
}
