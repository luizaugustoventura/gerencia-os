/*
  Código fonte escrito por Luiz Augusto Ventura
  Contato: luizaugustoventu1998@hotmail.com
  https://luizaugustoventura.com.br

  "No que diz respeito ao empenho, ao compromisso, ao esforço, à dedicação, não existe meio termo.
  Ou você faz uma coisa bem feita ou não faz." Ayrton Senna
*/

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference, QuerySnapshot, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Pessoa } from 'src/app/models/Pessoa/pessoa';
import { map, take } from 'rxjs/operators';
import { OS } from 'src/app/models/OS/os';

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  private pessoas: Observable<Pessoa[]>;
  private pessoasCollection: AngularFirestoreCollection<Pessoa>;

  private ordens: Observable<OS[]>;
  private ordensCollection: AngularFirestoreCollection<OS>;

  constructor(private afs: AngularFirestore) {
    this.pessoasCollection = this.afs.collection<Pessoa>('pessoas', ref => ref.orderBy('nome'));
    this.ordensCollection = this.afs.collection<OS>('ordens');

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

    this.ordens = this.ordensCollection.snapshotChanges()
    .pipe(
      map(actions => {
        return actions.map(a => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data();
          return { id, ...data };
        });
      })
    );
  }

  // Função que verifica se uma pessoa possui ordens de serviço registradas
  getOrdensByPessoa(pessoaId: string): Promise<any> {
    return this.ordensCollection.ref.where('usuarioId', '==', pessoaId).get();
  }

  getPessoas(): Observable<Pessoa[]> {
    return this.pessoas;
  }

  getPessoa(id: string): Observable<Pessoa> {
    return this.pessoasCollection.doc<Pessoa>(id).valueChanges()
    .pipe(
      take(1),
      map(pessoa => {
        pessoa.id = id;
        return pessoa;
      })
    );
  }

  getPessoaByEmail(email: string): Promise<QuerySnapshot<DocumentData>> {
    return this.pessoasCollection.ref.where('email', '==', email).get();
  }

  searchPessoa(busca: string): Observable<Pessoa[]> {
    return this.pessoasCollection.snapshotChanges()
    .pipe(
      map(actions => {
        return actions.filter(item => {
          ((item.payload.doc.data().nome.toLocaleLowerCase().includes(busca.toLocaleLowerCase()))
          ||
          (item.payload.doc.data().email.toLocaleLowerCase().includes(busca.toLocaleLowerCase()))
          ||
          (item.payload.doc.data().departamento.toLocaleLowerCase().includes(busca.toLocaleLowerCase())))
        })
        .map(a => {
          console.log(a.payload.doc.data());
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  create(pessoa: Pessoa): Promise<DocumentReference> {
    return this.pessoasCollection.add(pessoa);
  }

  update(pessoa: Pessoa): Promise<void> {
    return this.pessoasCollection.doc(pessoa.id)
    .update({
      nome: pessoa.nome,
      email: pessoa.email,
      telefone: pessoa.telefone,
      senha: pessoa.senha,
    });
  }

  delete(id: string): Promise<void> {
    return this.pessoasCollection.doc(id).delete();
  }
}
