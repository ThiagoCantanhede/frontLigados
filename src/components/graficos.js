import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import GraficoCurriculo from './graficosCurriculo.js';
import GraficoCurtidaCurriculo from './graficoCurtidaCurriculo.js';
import GraficoCurtidaArtigo from './graficoCurtidaArtigos.js';
import GraficoCandidatura from './graficoCandidaturas.js';

export default function Graficos(props) {
  const history = useHistory();

  const retornar = () => {
    history.push('/curriculo');
  };

  return (
    <div>
      <div className="row container col s12">
        <GraficoCurriculo />
        <GraficoCurtidaCurriculo />
        <GraficoCurtidaArtigo />
        <GraficoCandidatura />
      </div>

      <div className="input-field col s1">
        <a className="waves-effect waves-light btn" onClick={retornar}>
          Fecha
        </a>
      </div>
    </div>
  );
}