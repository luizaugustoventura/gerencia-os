import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { HomeComponent } from './pages/home/home.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalPessoaComponent } from './pages/modal-pessoa/modal-pessoa.component';
import { ModalOrdemComponent } from './pages/modal-ordem/modal-ordem.component';
import { ModalExcluirComponent } from './pages/modal-excluir/modal-excluir.component';
import { ToastComponent } from './toast/toast.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ModalPessoaComponent,
    ModalOrdemComponent,
    ModalExcluirComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    AngularFirestore
  ],
  entryComponents: [ModalExcluirComponent, ModalOrdemComponent, ModalPessoaComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
