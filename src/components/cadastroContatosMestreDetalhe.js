import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import operacoes from '../services/ContatosService.js';
import ComponenteDetalhesContato from './componenteDetalhesContato';
import { jsPDF } from 'jspdf';

export default function CadastroContatosMestreDetalhe(props) {
  const history = useHistory();
  const [contatosCadastrados, montarCard] = useState([]);
  const [objetoContato, preencherObjetoContato] = useState(null);
  let idUsuario = null;

  useEffect(async () => {
    montarCard(await montarCards());
  }, [objetoContato, contatosCadastrados]);

  const retornarContatos = async () => {
    retornarIdUsuario();
    const contatos = await operacoes.getAll();
    const arrayContatos = [];
    contatos.data.map((c) => {
      if (c.usuarioId === idUsuario) {
        arrayContatos.push(c);
      }
    });
    return arrayContatos;
  };

  const retornarIdUsuario = () => {
    let usuario = sessionStorage.getItem('login');
    usuario = JSON.parse(usuario);
    idUsuario = usuario._id;
  };

  const visualizarContato = async (contato) => {
    localStorage.setItem('visualisandoContato', JSON.stringify(contato));
    history.push('/contato');
    montarCard(await montarCards());
  };

  const excluirContato = async (contato) => {
    await operacoes.remove(contato._id);
    montarCard(await montarCards());
  };

  const novoContato = async () => {
    localStorage.removeItem('visualisandoContato');
    history.push('/contato');
    montarCard(await montarCards());
  };

  const exportarPDF = (contato) => {
    const doc = new jsPDF();
    doc.text('NOME: ' + contato.nome, 10, 10);
    doc.text('E-MAIL: ' + contato.email, 10, 20);
    doc.text('TELEFONE: ' + contato.telefone, 10, 30);
    doc.save('contato.pdf');
  };

  const retornar = () => {
    history.push('/');
  };

  const montarCards = async () => {
    const contatos = await retornarContatos();
    return (
      <div>
        <div className="row container col s12">
          <div className="input-field col s1">
            <a className="waves-effect waves-light btn" onClick={retornar}>
              Fechar
            </a>
          </div>
          <div className="col s1">
            <a
              class="btn-floating btn-large waves-effect waves-light"
              onClick={() => novoContato()}
            >
              +
            </a>
          </div>
          <div className="col s5">
            <div className="collection">
              {contatos.length ? (
                contatos.map((c, i) => (
                  <a
                    key={i}
                    className="collection-item"
                    onClick={() => preencherObjetoContato(c)}
                  >
                    <span
                      class="new badge"
                      data-badge-caption="Excluir"
                      onClick={() => excluirContato(c)}
                    ></span>
                    <span
                      class="new badge"
                      data-badge-caption="Editar"
                      onClick={() => visualizarContato(c)}
                    ></span>
                    <span
                      class="new badge"
                      data-badge-caption="PDF"
                      onClick={() => exportarPDF(c)}
                    ></span>
                    {c.nome}
                  </a>
                ))
              ) : (
                <div className="input-field col s12 center">
                  <p>Nenhum dado para exibir</p>
                </div>
              )}
            </div>
          </div>
          <div className="col s5">
            <ComponenteDetalhesContato contato={objetoContato} />
          </div>
        </div>
      </div>
    );
  };

  return <div className="row container">{contatosCadastrados}</div>;
}
