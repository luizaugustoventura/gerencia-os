/*
  Código fonte escrito por Luiz Augusto Ventura
  Contato: luizaugustoventu1998@hotmail.com
  https://luizaugustoventura.com.br

  "No que diz respeito ao empenho, ao compromisso, ao esforço, à dedicação, não existe meio termo.
  Ou você faz uma coisa bem feita ou não faz." Ayrton Senna
*/

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Pessoa } from 'src/app/models/Pessoa/pessoa';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private pessoas: Observable<Pessoa[]>;
  private pessoasCollection: AngularFirestoreCollection<Pessoa>;


  constructor(private afs: AngularFirestore) {
    this.pessoasCollection = this.afs.collection<Pessoa>('pessoas');

    this.pessoas = this.pessoasCollection.snapshotChanges()
    .pipe(
      map(actions => {
        return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          }
        );
      })
    );
  }

  async teste() {

    let pessoa: Pessoa;
    let email = 'luiz@gmail.com';
    let senha = '123456';

    await this.pessoasCollection.ref.where('email', '==', email).
    where('senha', '==', senha).limit(1)
    .get()
    .then(querySnapshot => {
        querySnapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots

            console.log(doc.data());
            pessoa = {
              id: doc.id,
              nome: doc.data().nome,
              email: doc.data().email,
              senha: doc.data().senha,
              departamento: doc.data().departamento,
              telefone: doc.data().telefone,
              admin: doc.data().admin
            };
        });
    })
    .catch(error => {
        console.log("Error getting documents: ", error);
    });

    if(pessoa)
      console.log("Cê é o bixão memo!");
    else
      console.log("Tem algo errado aí meu bacano");
  }
}
