import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'materialize-css/dist/css/materialize.min.css';
import CadastroUsuario from './components/cadastroUsuario';
import CadastroCurriculo from './components/cadastroCurriculo';
import CadastroVaga from './components/cadastroVaga';
import ConsultarVagas from './components/vagas';
import CadastroArtigo from './components/cadastroArtigo';
import ConsultarArtigos from './components/artigos';

import App from './app';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={App} />
      <Route path="/cadastro" component={CadastroUsuario} />
      <Route path="/curriculo" component={CadastroCurriculo} />
      <Route path="/vaga" component={CadastroVaga} />
      <Route path="/consultarVagas" component={ConsultarVagas} />
      <Route path="/escreverArtigo" component={CadastroArtigo} />
      <Route path="/consultarArtigos" component={ConsultarArtigos} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
