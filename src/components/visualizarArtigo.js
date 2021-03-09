import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';

export default function VisualizarArtigo(props) {
  var titulo = '';
  var descricao = '';
  var nome = '';
  var id = '';

  const [artigo, montarArtigos] = useState([]);

  useEffect(() => {
    montarArtigos(montarArtigo());
  }, []);

  const exportarPDF = () => {
    let artigo = localStorage.getItem('visualisandoArtigo');
    artigo = JSON.parse(artigo);

    const doc = new jsPDF();
    doc.text('TÍTULO: ' + artigo.titulo, 10, 10);
    doc.text('AUTOR: ' + artigo.autorNome, 10, 20);
    doc.text('DESCRIÇÃO: ' + artigo.descricao, 10, 30);

    doc.save('artigo.pdf');
  };

  const montarArtigo = () => {
    let artigoRecuperado = localStorage.getItem('visualisandoArtigo');
    artigoRecuperado = JSON.parse(artigoRecuperado);
    return (
      <div className="row container">
        <form className="col s12">
          <div className="input-field col s12">
            <input
              id="titulo"
              type="text"
              value={artigoRecuperado.titulo}
              className="validate"
              readOnly
            ></input>
            <label className="active" htmlFor="titulo">
              Título
            </label>
          </div>

          <div className="input-field col s12">
            <textarea
              id="descricao"
              value={artigoRecuperado.descricao}
              style={{ height: 30 + 'em' }}
              readOnly
            ></textarea>
            <label className="active" htmlFor="descricao">
              Descrição
            </label>
            <a className="waves-effect waves-light btn" onClick={exportarPDF}>
              Exportar para PDF
            </a>
          </div>
        </form>
      </div>
    );
  };
  return <div className="row container">{artigo}</div>;
}
