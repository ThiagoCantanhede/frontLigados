import operacoesAuditoria from './services/AuditoriaService.js';

export default class salvarAuditoria {
  salvarAuditoria = async (usuarioId, tipoAcao) => {
    let mes = new Date().getMonth() + 1;
    let auditoria = {
      usuarioId: usuarioId,
      tipoAcao: tipoAcao,
      mesAcao: mes,
      anoAcao: new Date().getFullYear().toString(),
    };
    await operacoesAuditoria.create(auditoria);
  };
}
