
export class OS {
  id?: string;
  usuarioId: string;
  dep_Origem: string;
  dep_Destino: string;
  servico: string;
  resposta?: string;
  data: firebase.firestore.Timestamp;
}
