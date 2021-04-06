import React, { useState, useEffect } from 'react';
import operacoes from '../services/CurriculoService.js';
import { useHistory } from 'react-router-dom';
import tipos from '../tipos.js';
import salvarAuditoria from '../auditoria.js';
import { jsPDF } from 'jspdf';

export default function CadastroCurriculo(props) {
  const [formacao, setFormacao] = useState('');
  const [competencias, setCompetencias] = useState('');
  const [experienciaProfissional, setExperienciaProfissional] = useState('');
  var nome = '';
  var id = '';
  var idCurriculo = null;
  const history = useHistory();

  useEffect(() => {
    curriculo();
  }, [formacao, competencias, experienciaProfissional]);

  const salvarCurriculo = () => {
    var curriculo = {
      formacao: formacao,
      competencias: competencias,
      experienciaProfissional: experienciaProfissional,
      usuarioId: id,
      usuarioNome: nome,
    };

    if (validarPreenchimento(curriculo)) {
      idCurriculo
        ? operacoes.update(idCurriculo, curriculo)
        : operacoes.create(curriculo);
      salvarNaAuditoria();
      retornar();
    } else {
      alert(
        'Para salvar, é necessário informar todos os dados do currículo. Verifique!'
      );
    }
  };

  const validarPreenchimento = (curriculo) => {
    return curriculo.formacao &&
      curriculo.competencias &&
      curriculo.experienciaProfissional
      ? true
      : false;
  };

  const salvarNaAuditoria = async () => {
    let tipo = new tipos();
    let auditoria = new salvarAuditoria();
    auditoria.salvarAuditoria(id, tipo.cadastroCurriculo);
  };

  const retornarIdNomeUsuario = () => {
    let usuario = sessionStorage.getItem('login');
    usuario = JSON.parse(usuario);
    id = usuario._id;
    nome = usuario.nome;
  };

  const curriculo = async () => {
    retornarIdNomeUsuario();
    const retorno = await operacoes.encontrarCurriculoPorUsuario(id);
    if (retorno.data[0]) {
      idCurriculo = retorno.data[0]._id ? retorno.data[0]._id : null;
      if (formacao === '') setFormacao(retorno.data[0].formacao);
      if (competencias === '') setCompetencias(retorno.data[0].competencias);
      if (experienciaProfissional === '')
        setExperienciaProfissional(retorno.data[0].experienciaProfissional);
    }
  };

  const handle = (event) => {
    if (event.target.id == 'formacao') {
      setFormacao(event.target.value);
    }
    if (event.target.id == 'competencias') {
      setCompetencias(event.target.value);
    }
    if (event.target.id == 'experiencia') {
      setExperienciaProfissional(event.target.value);
    }
  };

  const abrirGrafico = () => {
    localStorage.removeItem('grafico');
    history.push('/graficos');
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text('NOME: ' + nome, 10, 10);
    doc.text('FORMAÇÃO: ' + formacao, 10, 20);
    doc.text('COMPETÊNCIAS: ' + competencias, 10, 30);
    doc.text('EXPERIÊNCIA PROFISSIONAL: ' + experienciaProfissional, 10, 40);

    doc.save('currículo.pdf');
  };

  const retornar = () => {
    history.push('/menuPessoal');
  };

  return (
    <div className="row container">
      <form className="col s12">
        <div className="input-field col s12"></div>
        <div className="input-field col s12">
          <textarea
            id="formacao"
            onChange={handle}
            value={formacao}
            style={{ height: 7 + 'em' }}
          ></textarea>
          <label className="active" htmlFor="formacao">
            Formação
          </label>
        </div>

        <div className="input-field col s12">
          <textarea
            id="competencias"
            onChange={handle}
            value={competencias}
            style={{ height: 7 + 'em' }}
          ></textarea>
          <label className="active" htmlFor="competencias">
            Competências
          </label>
        </div>

        <div className="input-field col s12">
          <textarea
            id="experiencia"
            onChange={handle}
            value={experienciaProfissional}
            style={{ height: 7 + 'em' }}
          ></textarea>
          <label className="active" htmlFor="experiencia">
            Experiência profissional
          </label>
        </div>

        <div className="input-field col s1">
          <a className="waves-effect waves-light btn" onClick={salvarCurriculo}>
            Salvar
          </a>
        </div>
        <div className="input-field col s2">
          <a className="waves-effect waves-light btn" onClick={exportarPDF}>
            Exportar para PDF
          </a>
        </div>
        <div className="input-field col s2">
          <a className="waves-effect waves-light btn" onClick={abrirGrafico}>
            Exibir estatística
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
