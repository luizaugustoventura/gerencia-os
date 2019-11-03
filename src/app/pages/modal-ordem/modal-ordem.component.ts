/*
  Código fonte escrito por Luiz Augusto Ventura
  Contato: luizaugustoventu1998@hotmail.com
  https://luizaugustoventura.com.br

  "No que diz respeito ao empenho, ao compromisso, ao esforço, à dedicação, não existe meio termo.
  Ou você faz uma coisa bem feita ou não faz." Ayrton Senna
*/

import { Component, OnInit, Input } from '@angular/core';
import { OS } from 'src/app/models/OS/os';
import * as firebase from 'firebase';
import { OrdensService } from 'src/app/services/Ordens/ordens.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/services/ToastController/toast.service';
import { Pessoa } from 'src/app/models/Pessoa/pessoa';
import { PessoasService } from 'src/app/services/Pessoas/pessoas.service';

@Component({
  selector: 'app-modal-ordem',
  templateUrl: './modal-ordem.component.html',
  styleUrls: ['./modal-ordem.component.css']
})
export class ModalOrdemComponent implements OnInit {

  @Input() id: string;
  @Input() id_Usuario: string;

  ordem: OS = new OS();
  pessoa: Pessoa = new Pessoa();
  date: Date;


  constructor(
    private ordensService: OrdensService,
    private pessoasService: PessoasService,
    private toastService: ToastService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    if(this.id) {
      this.ordensService.getOrdem(this.id)
      .subscribe(os => {
        this.ordem = os;
      });
    }

    if(this.id_Usuario) {
      this.pessoasService.getPessoa(this.id_Usuario)
      .subscribe(usuario => {
        this.pessoa = usuario;
      });
    }
  }

  registrar(os: any) {
    const ordemServico: OS = {
      usuario: this.pessoa,
      dep_Origem: os.dep_Origem,
      dep_Destino: os.dep_Destino,
      servico: os.servico,
      data: firebase.firestore.Timestamp.fromDate(new Date())
    };

    this.ordensService.create(ordemServico)
    .then(() => {
      console.log('Ordem de serviço registrada');
      this.toastService.show(true, 'Ordem de serviço registrada com sucesso');
    })
    .catch(error => {
      console.log(error);
      this.toastService.show(false, 'Erro ao registrar ordem de serviço');
    });
  }

  alterar(os: any) {
    const ordemServico: OS = {
      usuario: this.pessoa,
      dep_Origem: os.dep_Origem,
      dep_Destino: os.dep_Destino,
      servico: os.servico,
      data: firebase.firestore.Timestamp.fromDate(new Date())
    };

    this.ordensService.update(ordemServico)
    .then(() => {
      console.log('Ordem de serviço atualizada');
      this.toastService.show(true, 'Ordem de serviço alterada com sucesso');
    })
    .catch(error => {
      console.log(error);
      this.toastService.show(false, 'Erro ao alterar ordem de serviço');
    });
  }

}
