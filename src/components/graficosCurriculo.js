import React, { useState, useEffect } from 'react';
import Chart from 'react-google-charts';
import operacoesAuditoria from '../services/AuditoriaService.js';
import tipos from '../tipos.js';
import { useHistory } from 'react-router-dom';

export default function GraficoCurriculo(props) {
  const [graficoComponente, montarComponente] = useState([]);
  const [dados, montarDatao] = useState([]);
  var data = [];
  let controle = true;
  const ano = new Date().getFullYear().toString();

  const retornarIdUsuario = () => {
    let usuario = sessionStorage.getItem('login');
    usuario = JSON.parse(usuario);

    return usuario._id;
  };

  useEffect(async () => {
    montarComponente(await montarGrafico());
  }, [dados]);

  const history = useHistory();
  const retornar = () => {
    history.push('/curriculo');
  };

  const montarGrafico = async () => {
    data.push(['Mês', 'Visualizações', { role: 'style' }]);
    const idUsuario = retornarIdUsuario();

    const dadosAuditoria = await operacoesAuditoria.retornarAcoesPorUsuario(
      idUsuario
    );
    let totJan = 0;
    let totFev = 0;
    let totMar = 0;
    let totAbr = 0;
    let totMai = 0;
    let totJun = 0;
    let totJul = 0;
    let totAgo = 0;
    let totSet = 0;
    let totOut = 0;
    let totNov = 0;
    let totDez = 0;
    let tipo = new tipos();

    dadosAuditoria.data.map(async (da) => {
      if (tipo.visualizacaoCurriculo === da.tipoAcao && da.anoAcao === ano) {
        if (da.mesAcao === '1') totJan++;
        if (da.mesAcao === '2') totFev++;
        if (da.mesAcao === '3') totMar++;
        if (da.mesAcao === '4') totAbr++;
        if (da.mesAcao === '5') totMai++;
        if (da.mesAcao === '6') totJun++;
        if (da.mesAcao === '7') totJul++;
        if (da.mesAcao === '8') totAgo++;
        if (da.mesAcao === '9') totSet++;
        if (da.mesAcao === '10') totOut++;
        if (da.mesAcao === '11') totNov++;
        if (da.mesAcao === '12') totDez++;
      }
    });
    data.push(['Janeiro', totJan, 'color: blue']);
    data.push(['Fevereiro', totFev, 'color: blue']);
    data.push(['Março', totMar, 'color: blue']);
    data.push(['Abril', totAbr, 'color: blue']);
    data.push(['Maio', totMai, 'color: blue']);
    data.push(['Junho', totJun, 'color: blue']);
    data.push(['Julho', totJul, 'color: blue']);
    data.push(['Agosto', totAgo, 'color: blue']);
    data.push(['Setembro', totSet, 'color: blue']);
    data.push(['Outubro', totOut, 'color: blue']);
    data.push(['Novembro', totNov, 'color: blue']);
    data.push(['Dezembro', totDez, 'color: blue']);

    montarDatao(data);

    return (
      <div className="App">
        <Chart chartType="Bar" width="100%" height="400px" data={data} />
        <div className="input-field col s12">Ano atual: {ano}</div>
        <div className="input-field col s1">
          <a className="waves-effect waves-light btn" onClick={retornar}>
            Fechar
          </a>
        </div>
      </div>
    );
  };
  return <div className="row container">{graficoComponente}</div>;
}
