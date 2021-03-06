import http from './http-common';

const login = (usuario, senha) => {
  return http.get(`/buscarUsuario?usuario=${usuario}&senha=${senha} `);
};

const getAll = () => {
  return http.get('/usuario');
};

const get = (id) => {
  return http.get(`/usuario/${id}`);
};

const create = (data) => {
  return http.post('/usuario', data);
};

const update = (id, data) => {
  return http.put(`/usuario/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/usuario/${id}`);
};

const removeAll = () => {
  return http.delete(`/usuario`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  login,
};
