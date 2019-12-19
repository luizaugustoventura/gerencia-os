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
    public activeModal: NgbActiveModal,
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
      });
    }
  }

  registrar(pessoa: any) {
    const usuario: Pessoa = {
      nome: pessoa.nome,
      email: pessoa.email,
      senha: pessoa.senha,
      departamento: pessoa.departamento,
      telefone: this.validaNumero(pessoa.telefone.toString()),
      funcao: 2
    };

    this.pessoasService.getPessoaByEmail(usuario.email)
    .then(querySnapshot => {
      if(querySnapshot.size > 0) {
        this.toastService.show(false, 'E-mail já está cadastrado');
        this.activeModal.close('Close click');
      }
      else {
        this.pessoasService.create(usuario)
        .then(() => {
          this.toastService.show(true, 'Usuário registrado com sucesso');
          this.activeModal.close('Close click');
        })
        .catch((error) => {
          console.log(error);
          this.toastService.show(false, 'Erro ao registrar usuário');
          this.activeModal.close('Close click');
        });
      }

    });
  }

  alterar(pessoa: any) {
    const usuario: Pessoa = {
      id: this.id,
      nome: pessoa.nome,
      email: pessoa.email,
      senha: pessoa.senha,
      departamento: pessoa.departamento,
      telefone: this.validaNumero(pessoa.telefone.toString()),
      funcao: 2
    };

    this.pessoasService.update(usuario)
    .then(() => {
      this.toastService.show(true, 'Usuário alterado com sucesso');
      this.activeModal.close('Close click');
    })
    .catch(error => {
      console.log(error);
      this.toastService.show(false, 'Erro ao alterar usuário');
      this.activeModal.close('Close click');
    });
  }

  validaNumero(n: string): string {
    const numero = n.replace(/[- ]/g, '');
    if (numero.startsWith('5535')) {
      return numero;
    }
    else {
      if (numero.startsWith('55') || numero.startsWith('35')) {
        return ('5535').concat(numero.slice(2,13));
      }
      else {
        return ('5535').concat(numero);
      }
    }
  }

}
