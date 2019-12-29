export class OS {
  id?: string;
  usuarioId: string;
  dep_Origem: string;
  dep_Destino: string;
  servico: string;
  data: firebase.firestore.Timestamp;
  resposta?: string;
  funcionarioId?: string;
  atendidaEm?: firebase.firestore.Timestamp;
}
