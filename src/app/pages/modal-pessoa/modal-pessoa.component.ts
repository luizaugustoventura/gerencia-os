/*
  Código fonte escrito por Luiz Augusto Ventura
  Contato: luizaugustoventu1998@hotmail.com
  https://luizaugustoventura.com.br

  "No que diz respeito ao empenho, ao compromisso, ao esforço, à dedicação, não existe meio termo.
  Ou você faz uma coisa bem feita ou não faz." Ayrton Senna
*/

import { Component, OnInit, Input } from '@angular/core';
import { Pessoa } from 'src/app/models/Pessoa/pessoa';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PessoasService } from 'src/app/services/Pessoas/pessoas.service';
import { ToastService } from 'src/app/services/ToastController/toast.service';
import { Observable } from 'rxjs';
import { Departamento } from 'src/app/models/Departamento/departamento';
import { OrdensService } from 'src/app/services/Ordens/ordens.service';

@Component({
  selector: 'app-modal-pessoa',
  templateUrl: './modal-pessoa.component.html',
  styleUrls: ['./modal-pessoa.component.css']
})
export class ModalPessoaComponent implements OnInit {

  departamentos: Observable<Departamento[]>;

  @Input() id: string;
  pessoa: Pessoa =  new Pessoa();


  constructor(
    private activeModal: NgbActiveModal,
    private pessoasService: PessoasService,
    private ordensService: OrdensService,
    private toastService: ToastService
  ) {
    this.departamentos = this.ordensService.getDepartamentos();
  }

  ngOnInit() {
    if(this.id) {
      this.pessoasService.getPessoa(this.id)
      .subscribe(p => {
        this.pessoa = p;
        console.log(p);
      });
    }
  }

  registrar(pessoa: any) {
    const usuario: Pessoa = {
      nome: pessoa.nome,
      email: pessoa.email,
      senha: pessoa.senha,
      departamento: pessoa.departamento,
      telefone: pessoa.telefone,
      admin: false
    };

    this.pessoasService.create(usuario)
    .then(() => {
      console.log('Usuário registrado');
      this.toastService.show(true, 'Usuário registrado com sucesso');
    })
    .catch((error) => {
      console.log(error);
      this.toastService.show(false, 'Erro ao registrar usuário');
    });
  }

  alterar(pessoa: any) {
    const usuario: Pessoa = {
      nome: pessoa.nome,
      email: pessoa.email,
      senha: pessoa.senha,
      departamento: pessoa.departamento,
      telefone: pessoa.telefone,
      admin: false
    };

    this.pessoasService.update(usuario)
    .then(() => {
      console.log('Usuário alterado');
      this.toastService.show(true, 'Usuário alterado com sucesso');
    })
    .catch(error => {
      console.log(error);
      this.toastService.show(false, 'Erro ao alterar usuário');
    });
  }
}
