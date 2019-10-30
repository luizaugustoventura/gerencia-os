/*
  Código fonte escrito por Luiz Augusto Ventura
  Contato: luizaugustoventu1998@hotmail.com
  https://luizaugustoventura.com.br

  "No que diz respeito ao empenho, ao compromisso, ao esforço, à dedicação, não existe meio termo.
  Ou você faz uma coisa bem feita ou não faz." Ayrton Senna
*/

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QuerySnapshot } from '@angular/fire/firestore';
import { Pessoa } from 'src/app/models/Pessoa/pessoa';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Login } from 'src/app/models/Login/login';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private pessoas: Observable<Pessoa[]>;
  private pessoasCollection: AngularFirestoreCollection<Pessoa>;
  private login: Login;

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

  logIn(email: string, senha: string): Promise<any> {

    console.log(email, senha);

    return this.pessoasCollection.ref.where('email', '==', email).
    where('senha', '==', senha).limit(1)
    .get();
  }

  setSessao(login: Login) {
    this.login = login;
  }

  getSessao(): Login {
    return this.login;
  }
}
