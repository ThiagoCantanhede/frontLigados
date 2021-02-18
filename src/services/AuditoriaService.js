import http from './http-common';

const getAll = () => {
  return http.get('/auditoria');
};
const get = (id) => {
  return http.get(`/auditoria/${id}`);
};

const create = (data) => {
  return http.post('/auditoria', data);
};

const retornarAcoesPorUsuario = (usuario) => {
  return http.get(`/acoesPorUsuario?usuario=${usuario}`);
};

const retornarAcoesPorTipo = (tipo) => {
  return http.get(`/acoesPorTipo?tipo=${tipo}`);
};

export default {
  get,
  getAll,
  create,
  retornarAcoesPorUsuario,
  retornarAcoesPorTipo,
};
