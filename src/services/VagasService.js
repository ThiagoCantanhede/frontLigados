import http from './http-common';

const getAll = () => {
  return http.get('/vaga');
};

const get = (id) => {
  return http.get(`/vaga/${id}`);
};

const create = (data) => {
  return http.post('/vaga', data);
};

const update = (id, data) => {
  return http.put(`/vaga/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/vaga/${id}`);
};

const removeAll = () => {
  return http.delete(`/vaga`);
};

const encontrarVagasDoRecrutador = (id) => {
  return http.get(`/vaga?usuario=${id}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  encontrarVagasDoRecrutador,
};
