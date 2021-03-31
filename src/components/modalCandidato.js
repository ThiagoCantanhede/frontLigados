import React, { useState, useEffect } from 'react';
import operacoes from '../services/CurriculoService.js';
import { useHistory } from 'react-router-dom';
import salvarAuditoria from '../auditoria.js';
import tipos from '../tipos.js';
import { jsPDF } from 'jspdf';

export default function CadastroCurriculo(props) {
  const history = useHistory();
  const [curriculoCandidato, montarCurriculo] = useState([]);
  let candidatoId = null;

  useEffect(async () => {
    montarCurriculo(await curriculo());
  }, []);

  const retornarCandidato = () => {
    const auxcandidatoId = localStorage.getItem('visualisandoCandidato');
    return JSON.parse(auxcandidatoId);
  };

  const salvarNaAuditoria = async (id) => {
    let tipo = new tipos();
    let auditoria = new salvarAuditoria();
    auditoria.salvarAuditoria(id, tipo.visualizacaoCurriculo);
  };
  const curriculo = async () => {
    candidatoId = retornarCandidato();
    const retorno = await operacoes.encontrarCurriculoPorUsuario(
      candidatoId._id
    );

    await salvarNaAuditoria(candidatoId._id);

    const formacao = retorno.data[0].formacao;
    const competencias = retorno.data[0].competencias;
    const experiencia = retorno.data[0].experienciaProfissional;

    const chamarModalMensagem = () => {
      history.push('/mensagem');
    };

    const agendamentoEntrevista = () => {
      localStorage.setItem('agendamento', retornarCandidato()._id);
      history.push('/agendamentoEntrevista');
    };

    const exportarPDF = () => {
      const doc = new jsPDF();
      doc.text('NOME: ' + retorno.data[0].usuarioNome, 10, 10);
      doc.text('FORMAÇÃO: ' + formacao, 10, 20);
      doc.text('COMPETÊNCIAS: ' + competencias, 10, 30);
      doc.text('EXPERIÊNCIA PROFISSIONAL: ' + experiencia, 10, 40);

      doc.save('currículo.pdf');
    };

    const curtir = async () => {
      let tipo = new tipos();
      let auditoria = new salvarAuditoria();
      auditoria.salvarAuditoria(retornarCandidato()._id, tipo.curtidaCurriculo);
    };

    const retornar = () => {
      history.push('/minhasVagas');
    };

    return (
      <div className="row container">
        <form className="col s12">
          <div className="input-field col s12"></div>
          <div className="input-field col s12">
            <textarea
              id="formacao"
              style={{ height: 7 + 'em' }}
              value={formacao}
              readOnly
            ></textarea>
            <label className="active" htmlFor="formacao">
              Formação
            </label>
          </div>

          <div className="input-field col s12">
            <textarea
              id="competencias"
              style={{ height: 7 + 'em' }}
              value={competencias}
              readOnly
            ></textarea>
            <label className="active" htmlFor="competencias">
              Competências
            </label>
          </div>

          <div className="input-field col s12">
            <textarea
              id="experiencia"
              style={{ height: 7 + 'em' }}
              value={experiencia}
              readOnly
            ></textarea>
            <label className="active" htmlFor="experiencia">
              Experiência profissional
            </label>
          </div>
          <div className="input-field col s3">
            <a
              className="waves-effect waves-light btn "
              onClick={chamarModalMensagem}
            >
              Enviar mensagem
            </a>
          </div>
          <div className="input-field col s3">
            <a
              className="waves-effect waves-light btn "
              onClick={agendamentoEntrevista}
            >
              Agendar entrevista
            </a>
          </div>
          <div className="input-field col s2">
            <a className="waves-effect waves-light btn" onClick={exportarPDF}>
              Exportar para PDF
            </a>
          </div>
          <div className="input-field col s2">
            <a className="waves-effect waves-light btn" onClick={curtir}>
              Curtir
            </a>
          </div>
          <div className="input-field col s2">
            <a className="waves-effect waves-light btn" onClick={retornar}>
              Fechar
            </a>
          </div>
        </form>
      </div>
    );
  };
  return <div className="row container">{curriculoCandidato}</div>;
}
