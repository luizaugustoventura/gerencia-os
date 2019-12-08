import { Component, OnInit, Input } from '@angular/core';
import { OrdensService } from 'src/app/services/Ordens/ordens.service';
import { OS } from 'src/app/models/OS/os';
import { ToastService } from 'src/app/services/ToastController/toast.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-resposta',
  templateUrl: './modal-resposta.component.html',
  styleUrls: ['./modal-resposta.component.css']
})
export class ModalRespostaComponent implements OnInit {

  @Input() id: string;
  ordem: OS = new OS();
  resposta: string = '';

  constructor(
    private ordensService: OrdensService,
    private toastService: ToastService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.ordensService.getOrdem(this.id)
    .subscribe(ordem => {
      this.ordem = ordem;
    });
  }

  alterar() {
    let os: OS = this.ordem;
    os.resposta = this.resposta;

    this.ordensService.update(os)
    .then(() => {
      this.toastService.show(true, 'Atendimento realizado com sucesso');
      this.activeModal.close('Close click');
    })
    .catch(error => {
      console.log(error);
      this.toastService.show(false, 'Erro ao realizar atendimento');
      this.activeModal.close('Close click');
    });
  }


}
