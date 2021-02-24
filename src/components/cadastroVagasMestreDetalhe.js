import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import operacoes from '../services/VagasService.js';
import operacaoesCandidatoVaga from '../services/CandidatosVagasService.js';
import operacaoesUsuarios from '../services/UsuariosService.js';
import { Link } from 'react-router-dom';

export default function CadastroVagasMestreDetalhe(props) {
  const history = useHistory();
  const [cardsVagasAnunciadas, montarCard] = useState([]);
  let idCandidato = null;
  const vagasCandidatos = [];

  useEffect(async () => {
    montarCard(await montarCards());
  }, []);

  const retornarVagas = async () => {
    retornarIdUsuario();
    const vagas = await operacoes.encontrarVagasDoRecrutador(idCandidato);
    const vagasXCandidatos = await operacaoesCandidatoVaga.getAll();
    const candidatos = await operacaoesUsuarios.getAll();
    const cand = [];

    vagas.data.map((v) => {
      vagasXCandidatos.data.map((vc) => {
        candidatos.data.map((c) => {
          if (vc.vagaId === v._id && vc.usuarioId === c._id) {
            cand.push(c);
          }
        });
      });

      const objetoVaga = {
        vaga: v,
        candidatos: cand,
      };
      vagasCandidatos.push(objetoVaga);
    });
    return vagasCandidatos;
  };

  const retornarIdUsuario = () => {
    let usuario = localStorage.getItem('login');
    usuario = JSON.parse(usuario);
    idCandidato = usuario._id;
  };

  const abrirCurriculo = (candidato) => {
    localStorage.setItem('visualisandoCandidato', JSON.stringify(candidato));
  };

  const visualizarVaga = (vaga) => {
    localStorage.setItem('visualisandoVaga', JSON.stringify(vaga));
  };

  const excluirVaga = (vaga) => {
    operacoes.remove(vaga.vaga._id);
    history.push('/');
  };

  const montarCards = async () => {
    const vagas = await retornarVagas();
    console.log(vagas);
    return (
      <div className="collection">
        {vagas.map((v, i) => (
          <a key={i} className="collection-item">
            <span
              class="new badge"
              data-badge-caption="Excluir"
              onClick={() => excluirVaga(v)}
            ></span>
            <Link to="/visualizarEditarVaga">
              <span
                class="new badge"
                data-badge-caption="Editar"
                onClick={() => visualizarVaga(v)}
              ></span>
            </Link>
            {v.vaga.titulo}
          </a>
        ))}
      </div>
    );

    // const teste = vagas.map((v, i) => {
    //   return (
    //     <div key={i} className="col s12 m4">
    //       <div className="card blue-grey darken-1">
    //         <div className="card-content white-text">
    //           <span className="card-title">{v.vaga.titulo}</span>
    //           <span>CANDIDATOS:</span>
    //           {v.candidatos.map((c) => {
    //             return (
    //               <p>
    //                 <a href="#" onClick={() => abrirCurriculo(c)}>
    //                   <Link to="/candidato">
    //                     {c.nome} - {c.email}
    //                   </Link>
    //                 </a>
    //               </p>
    //             );
    //           })}
    //         </div>
    //         <div className="card-action">
    //           <a href="#" onClick={() => visualizarVaga(v)}>
    //             <Link to="/visualizarEditarVaga">Visualizar vaga</Link>
    //           </a>
    //           <a href="#" onClick={() => excluirVaga(v)}>
    //             Excluir vaga
    //           </a>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // });
    // return teste;
  };

  return <div className="row container">{cardsVagasAnunciadas}</div>;
}
