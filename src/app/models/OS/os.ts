import { Pessoa } from '../Pessoa/pessoa';

export class OS {
  id?: string;
  usuario: Pessoa;
  dep_Origem: string;
  dep_Destino: string;
  servico: string;
  resposta?: string;
  data: firebase.firestore.Timestamp;
}
