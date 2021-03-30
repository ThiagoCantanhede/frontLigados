import http from './http-common';

const getAll = () => {
  return http.get('/agendamento');
};
const get = (id) => {
  return http.get(`/agendamento/${id}`);
};

const create = (data) => {
  return http.post('/agendamento', data);
};

const retornarAgendamentosPorRecrutador = (recrutador) => {
  return http.get(`/agendamentosPorRecrutador?recrutador=${recrutador}`);
};

const retornarAgendamentosPorCandidato = (candidato) => {
  return http.get(`/agendamentosPorCandidato?candidato=${candidato}`);
};

export default {
  get,
  getAll,
  create,
  retornarAgendamentosPorRecrutador,
  retornarAgendamentosPorCandidato,
};
