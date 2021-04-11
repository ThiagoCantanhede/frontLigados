import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import operacoes from '../services/ProjetosService.js';
import ComponenteDetalhesProjeto from './componenteDetalhesProjetos';
import { jsPDF } from 'jspdf';

export default function CadastroProjetosMestreDetalhe(props) {
  const history = useHistory();
  const [projetosCadastrados, montarCard] = useState([]);
  const [objetoProjeto, preencherObjetoContato] = useState(null);
  let idUsuario = null;

  useEffect(async () => {
    montarCard(await montarCards());
  }, [objetoProjeto, projetosCadastrados]);

  const retornarProjetos = async () => {
    retornarIdUsuario();
    const projetos = await operacoes.getAll();
    const arrayProjetos = [];
    projetos.data.map((c) => {
      if (c.usuarioId === idUsuario) {
        arrayProjetos.push(c);
      }
    });
    return arrayProjetos;
  };

  const retornarIdUsuario = () => {
    let usuario = sessionStorage.getItem('login');
    usuario = JSON.parse(usuario);
    idUsuario = usuario._id;
  };

  const visualizarProjeto = async (projeto) => {
    localStorage.setItem('visualisandoProjeto', JSON.stringify(projeto));
    history.push('/projeto');
    montarCard(await montarCards());
  };

  const excluirProjeto = async (projeto) => {
    await operacoes.remove(projeto._id);
    montarCard(await montarCards());
  };

  const novoProjeto = async () => {
    localStorage.removeItem('visualisandoProjeto');
    history.push('/projeto');
    montarCard(await montarCards());
  };

  const exportarPDF = (projeto) => {
    const doc = new jsPDF();
    doc.text('NOME: ' + projeto.nome, 10, 10);
    doc.text('DESCRIÇÃO: ' + projeto.descricao, 10, 20);
    doc.text('LINK: ' + projeto.link, 10, 30);
    doc.save('projeto.pdf');
  };

  const retornar = () => {
    history.push('/menuPessoal');
  };

  const montarCards = async () => {
    const projetos = await retornarProjetos();
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
              className="btn-floating btn-large waves-effect waves-light"
              onClick={() => novoProjeto()}
            >
              +
            </a>
          </div>
          <div className="col s5">
            <div className="collection">
              {projetos.length ? (
                projetos.map((p, i) => (
                  <a
                    key={i}
                    className="collection-item"
                    onClick={() => preencherObjetoContato(p)}
                  >
                    <span
                      className="new badge"
                      data-badge-caption="Excluir"
                      onClick={() => excluirProjeto(p)}
                    ></span>
                    <span
                      className="new badge"
                      data-badge-caption="Editar"
                      onClick={() => visualizarProjeto(p)}
                    ></span>
                    <span
                      className="new badge"
                      data-badge-caption="PDF"
                      onClick={() => exportarPDF(p)}
                    ></span>
                    {p.nome}
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
            <ComponenteDetalhesProjeto projeto={objetoProjeto} />
          </div>
        </div>
      </div>
    );
  };

  return <div className="row container">{projetosCadastrados}</div>;
}
