import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-mensagem',
  templateUrl: './modal-mensagem.component.html',
  styleUrls: ['./modal-mensagem.component.css']
})
export class ModalMensagemComponent implements OnInit {

  @Input() nome: string;
  @Input() telefone: string;
  mensagem: string;

  constructor(
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  enviar() {
    if(this.mensagem) {
      window.open('https://api.whatsapp.com/send?phone=5535997442108&text=Olá', '_blank');
    }
  }

}
