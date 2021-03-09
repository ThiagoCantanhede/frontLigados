import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';

export default function VisualizarVaga(props) {
  const [vaga, setVaga] = useState(null);

  useEffect(() => {
    montarVaga();
  }, [vaga]);

  const montarVaga = () => {
    let lVaga = localStorage.getItem('visualisandoVaga');
    lVaga = JSON.parse(lVaga);
    setVaga(lVaga);
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text('TÍTULO: ' + vaga.titulo, 10, 10);
    doc.text('DESCRIÇÃO: ' + vaga.descricao, 10, 20);
    doc.text('REQUISITOS: ' + vaga.competencias, 10, 30);
    doc.text('RENDIMENTOS: ' + vaga.rendimentos, 10, 40);
    doc.text('BENEFÍCIOS: ' + vaga.beneficios, 10, 50);
    doc.save('vaga.pdf');
  };

  return (
    <div className="row container">
      <form className="col s12">
        <div className="row container">
          <div className="input-field col s12"></div>
          <div className="input-field col s4"></div>
          <div className="input-field col s8">
            <input
              id="titulo"
              type="text"
              value={vaga ? vaga.titulo : ''}
              className="validate"
            ></input>
            <label className="active" htmlFor="titulo">
              Título
            </label>
          </div>

          <div className="input-field col s4"></div>
          <div className="input-field col s8">
            <textarea
              id="descricao"
              value={vaga ? vaga.descricao : ''}
              style={{ height: 7 + 'em' }}
            ></textarea>
            <label className="active" htmlFor="descricao">
              Descrição da vaga
            </label>
          </div>

          <div className="input-field col s4"></div>
          <div className="input-field col s8">
            <textarea
              id="competencias"
              value={vaga ? vaga.competencias : ''}
              style={{ height: 7 + 'em' }}
            ></textarea>
            <label className="active" htmlFor="competencias">
              Requisitos da vaga
            </label>
          </div>

          <div className="input-field col s4"></div>
          <div className="input-field col s8">
            <input
              id="rendimentos"
              type="text"
              value={vaga ? vaga.rendimentos : ''}
              className="validate"
            ></input>
            <label className="active"> Rendimentos</label>
          </div>

          <div className="input-field col s4"></div>
          <div className="input-field col s8">
            <textarea
              id="beneficios"
              value={vaga ? vaga.beneficios : ''}
              style={{ height: 7 + 'em' }}
            ></textarea>
            <label className="active" htmlFor="Beneficios">
              Beneficios
            </label>
            <a className="waves-effect waves-light btn" onClick={exportarPDF}>
              Exportar para PDF
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
