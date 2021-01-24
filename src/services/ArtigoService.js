import http from './http-common';

const getAll = () => {
  return http.get('/artigo');
};

const get = (id) => {
  return http.get(`/artigo/${id}`);
};

const create = (data) => {
  return http.post('/artigo', data);
};

const update = (id, data) => {
  return http.put(`/artigo/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/artigo/${id}`);
};

const removeAll = () => {
  return http.delete(`/artigo`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
};
