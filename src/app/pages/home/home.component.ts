/*
  Código fonte escrito por Luiz Augusto Ventura
  Contato: luizaugustoventu1998@hotmail.com
  https://luizaugustoventura.com.br

  "No que diz respeito ao empenho, ao compromisso, ao esforço, à dedicação, não existe meio termo.
  Ou você faz uma coisa bem feita ou não faz." Ayrton Senna
*/

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pessoa } from 'src/app/models/Pessoa/pessoa';
import { PessoasService } from 'src/app/services/Pessoas/pessoas.service';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';
import { Router } from '@angular/router';
import { OS } from 'src/app/models/OS/os';
import { OrdensService } from 'src/app/services/Ordens/ordens.service';
import { Login } from 'src/app/models/Login/login';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalPessoaComponent } from '../modal-pessoa/modal-pessoa.component';
import { ModalOrdemComponent } from '../modal-ordem/modal-ordem.component';
import { ModalExcluirComponent } from '../modal-excluir/modal-excluir.component';
import { ModalRespostaComponent } from '../modal-resposta/modal-resposta.component';
import { ModalMensagemComponent } from '../modal-mensagem/modal-mensagem.component';

declare global {
  interface Window {
    find?: any;
  }
  interface HTMLElement {
    createTextRange?: any;
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  pessoas: Observable<Pessoa[]>;
  ordens: Observable<OS[]>;
  login: Login;

  teste: Pessoa[];
  constructor(
    private pessoasService: PessoasService,
    private ordensService: OrdensService,
    private authService: AuthenticationService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.pessoas = this.pessoasService.getPessoas();
    this.ordens = this.ordensService.getOrdens();
    this.login = this.authService.getSessao();
  }

  ngOnInit() {
    if(!this.authService.getSessao()) {
      console.log('Por favor, efetue login antes!');
      this.router.navigate(['']);
    }
    else {
      console.log('Sessão iniciada');
    }
  }


  modalPessoa(id: string) {
    const modal = this.modalService.open(ModalPessoaComponent);
    modal.componentInstance.id = id;

  }

  modalOS(id: string = '', id_Usuario: string = '') {
    const modal = this.modalService.open(ModalOrdemComponent);
    modal.componentInstance.id = id;
    modal.componentInstance.id_Usuario = id_Usuario;
  }

  modalResposta(id_OS: string) {
    const modal = this.modalService.open(ModalRespostaComponent);
    modal.componentInstance.id = id_OS;
  }

  modalMensagem(id: string) {
    const modal = this.modalService.open(ModalMensagemComponent);
    modal.componentInstance.id = id;
  }

  modalExcluir(seg: string, id: string) {
    const modal = this.modalService.open(ModalExcluirComponent);
    modal.componentInstance.segmento = seg;
    modal.componentInstance.id = id;
  }

  searchPessoas(buscar: string) {
    this.pessoas = this.pessoasService.searchPessoa(buscar);
  }

  search(text: string) {
    if (window.find && window.getSelection) {
      document.designMode = "on";
      var sel = window.getSelection();
      sel.collapse(document.body, 0);

      while (window.find(text)) {
          document.execCommand("HiliteColor", false, "yellow");
          sel.collapseToEnd();
      }
      document.designMode = "off";
    }
    else if (document.body.createTextRange) {
      var textRange = document.body.createTextRange();
      while (textRange.findText(text)) {
          textRange.execCommand("BackColor", false, "yellow");
          textRange.collapse(false);
      }
    }
  }

  logout() {
    this.router.navigate(['']);
  }
}
