import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Pessoa } from 'src/app/models/Pessoa/pessoa';
import { PessoasService } from 'src/app/services/Pessoas/pessoas.service';

@Component({
  selector: 'app-modal-mensagem',
  templateUrl: './modal-mensagem.component.html',
  styleUrls: ['./modal-mensagem.component.css']
})
export class ModalMensagemComponent implements OnInit {

  @Input() id: string;
  mensagem: string;
  usuario: Pessoa;

  constructor(
    private activeModal: NgbActiveModal,
    private pessoasService: PessoasService
  ) { }

  ngOnInit() {
    this.pessoasService.getPessoa(this.id)
    .subscribe(pessoa => {
      this.usuario = pessoa;
    })
  }

  enviar() {
    if(this.mensagem) {
      window.open(`https://api.whatsapp.com/send?phone=${this.usuario.telefone}&text=${this.mensagem}`, '_blank');
    }
  }

}
