import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const RotaPrivada = (props) => {
  const logado = !!localStorage.getItem('login');
  return logado ? <Route {...props} /> : <Redirect to="/login" />;
};

export default RotaPrivada;
