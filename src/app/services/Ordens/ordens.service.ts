import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OS } from 'src/app/models/OS/os';
import { map, take } from 'rxjs/operators';
import { AngularFirestoreCollection, DocumentReference, AngularFirestore, sortedChanges } from '@angular/fire/firestore';
import { Departamento } from 'src/app/models/Departamento/departamento';

@Injectable({
  providedIn: 'root'
})
export class OrdensService {

  private ordens: Observable<OS[]>;
  private ordensCollection: AngularFirestoreCollection<OS>;

  private departamentos: Observable<Departamento[]>;
  private departamentosCollection: AngularFirestoreCollection<Departamento>;

  constructor(private afs: AngularFirestore) {
    this.ordensCollection = this.afs.collection<OS>('ordens', ref => ref.orderBy('data', 'desc'));
    this.departamentosCollection = this.afs.collection<Departamento>('departamentos', ref => ref.orderBy('nome'));

    this.ordens = this.ordensCollection.snapshotChanges()
    .pipe(
      map(actions => {
        return actions.map(a => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data();
          return { id, ...data };
        })
      })
    );

    this.departamentos = this.departamentosCollection.snapshotChanges()
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

  getDepartamentos(): Observable<Departamento[]> {
    return this.departamentos;
  }

  getOrdens(): Observable<OS[]> {
    return this.ordens;
  }

  getOrdem(id: string): Observable<OS> {
    return this.ordensCollection.doc<OS>(id).valueChanges()
    .pipe(
      take(1),
      map(os => {
        os.id = id;
        return os;
      })
    );
  }

  create(ordem: OS): Promise<DocumentReference> {
    return this.ordensCollection.add(ordem);
  }

  update(ordem: OS): Promise<void> {
    if(ordem.resposta || ordem.funcionarioId || ordem.atendidaEm) {
      return this.ordensCollection.doc(ordem.id)
      .update({
        dep_Destino: ordem.dep_Destino,
        servico: ordem.servico,
        data: ordem.data,
        funcionarioId: ordem.funcionarioId,
        atendidaEm: ordem.atendidaEm,
        resposta: ordem.resposta,
      });
    }
    return this.ordensCollection.doc(ordem.id)
    .update({
      dep_Destino: ordem.dep_Destino,
      servico: ordem.servico,
      data: ordem.data
    });
  }

  delete(id: string): Promise<void> {
    return this.ordensCollection.doc(id).delete();
  }
}
