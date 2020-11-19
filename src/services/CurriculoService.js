import http from './http-common';

const getAll = () => {
  return http.get('/curriculo');
};

const get = (id) => {
  return http.get(`/curriculo/${id}`);
};

const create = (data) => {
  return http.post('/', data);
};

const update = (id, data) => {
  return http.put(`/curriculo/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/curriculo/${id}`);
};

const removeAll = () => {
  return http.delete(`/curriculo`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
};
