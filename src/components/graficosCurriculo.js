import React from 'react';
import Chart from 'react-google-charts';

export default function GraficoCurriculo(props) {
  const data = [
    ['Year', 'Visitations', { role: 'style' }],
    ['2010', 10, 'color: blue'],
    ['2011', 14, 'color: blue'],
    ['2012', 3, 'color: blue'],
  ];

  return (
    <div className="App">
      <Chart chartType="Bar" width="100%" height="400px" data={data} />
    </div>
  );
}
