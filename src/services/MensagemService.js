import http from './http-common';

const get = (id) => {
  return http.get(`/mensagem/${id}`);
};

const create = (data) => {
  return http.post('/mensagem', data);
};

const remove = (id) => {
  return http.delete(`/mensagem/${id}`);
};

const removeAll = () => {
  return http.delete(`/mensagem`);
};

const encontrarMensagemPorAutor = (autor) => {
  return http.get(`/mensagem?autor=${autor}`);
};

const encontrarMensagemPorDestinatario = (destinatario) => {
  return http.get(`/mensagemPorDestinatario?destinatario=${destinatario}`);
};

export default {
  get,
  create,
  remove,
  removeAll,
  encontrarMensagemPorAutor,
  encontrarMensagemPorDestinatario,
};
