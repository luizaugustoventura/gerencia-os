/*
  Código fonte escrito por Luiz Augusto Ventura
  Contato: luizaugustoventu1998@hotmail.com
  https://luizaugustoventura.com.br

  "No que diz respeito ao empenho, ao compromisso, ao esforço, à dedicação, não existe meio termo.
  Ou você faz uma coisa bem feita ou não faz." Ayrton Senna
*/

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Pessoa } from 'src/app/models/Pessoa/pessoa';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  pessoas: Observable<Pessoa[]>;
  pessoasCollection: AngularFirestoreCollection<Pessoa>;

  constructor(private afs: AngularFirestore) {
    this.pessoasCollection = this.afs.collection<Pessoa>('pessoas');

    this.pessoas = this.pessoasCollection.snapshotChanges()
    .pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getPessoas(): Observable<Pessoa[]> {
    return this.pessoas;
  }
}
