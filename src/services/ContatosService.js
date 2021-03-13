import http from './http-common';

const getAll = () => {
  return http.get('/contato');
};

const get = (id) => {
  return http.get(`/contato/${id}`);
};

const create = (data) => {
  return http.post('/contato', data);
};

const update = (id, data) => {
  return http.put(`/contato/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/contato/${id}`);
};

const removeAll = () => {
  return http.delete(`/contato`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
};
