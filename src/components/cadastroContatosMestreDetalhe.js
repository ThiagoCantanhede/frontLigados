import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import operacoes from '../services/ContatosService.js';
import operacaoesUsuarios from '../services/UsuariosService.js';
import ComponenteDetalhesContato from './componenteDetalhesContato';
import { jsPDF } from 'jspdf';

export default function CadastroContatosMestreDetalhe(props) {
  const history = useHistory();
  const [cardsContatosAnunciadas, montarCard] = useState([]);
  const [objetoContato, preencherObjetoContato] = useState(null);
  let idCandidato = null;
  const vagasCandidatos = [];

  useEffect(async () => {
    montarCard(await montarCards());
  }, [objetoContato, cardsContatosAnunciadas]);

  const retornarContatos = async () => {
    retornarIdUsuario();
    const contatos = await operacoes.getAll();
    const arrayContatos = [];
    contatos.data.map((c) => {
      if (c.usuarioId === idCandidato) {
        arrayContatos.push(c);
      }
    });
    return arrayContatos;
  };

  const retornarIdUsuario = () => {
    let usuario = localStorage.getItem('login');
    usuario = JSON.parse(usuario);
    idCandidato = usuario._id;
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

  const montarCards = async () => {
    const contatos = await retornarContatos();
    return (
      <div>
        <div className="row container col s12">
          <div className="col s2">
            <a
              class="btn-floating btn-large waves-effect waves-light"
              onClick={() => novoContato()}
            >
              +
            </a>
          </div>
          <div className="col s5">
            <div className="collection">
              {contatos.map((c, i) => (
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
              ))}
            </div>
          </div>
          <div className="col s5">
            <ComponenteDetalhesContato contato={objetoContato} />
          </div>
        </div>
      </div>
    );
  };

  return <div className="row container">{cardsContatosAnunciadas}</div>;
}
