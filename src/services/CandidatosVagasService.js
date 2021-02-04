import http from './http-common';

const getAll = () => {
  return http.get('/vagasCandidatos');
};

const get = (id) => {
  return http.get(`/vagasCandidatos/${id}`);
};

const create = (data) => {
  return http.post('/vagasCandidatos', data);
};

const update = (id, data) => {
  return http.put(`/vagasCandidatos/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/vagasCandidatos/${id}`);
};

const removeAll = () => {
  return http.delete(`/vagasCandidatos`);
};

const encontrarVagasDoCandidato = (candidato) => {
  return http.get(`/encontrarVagasDoCandidato?candidato=${candidato}`);
};

const encontrarCandidatosDaVaga = (vaga) => {
  return http.get(`/encontrarCandidatosDaVaga?vaga=${vaga}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  encontrarVagasDoCandidato,
  encontrarCandidatosDaVaga,
};
