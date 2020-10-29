import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'materialize-css/dist/css/materialize.min.css';
import CadastroUsuario from './components/cadastroUsuario';
import App from './app';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

ReactDOM.render(
  //teste 2
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={App} />
      <Route path="/cadastro" component={CadastroUsuario} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
