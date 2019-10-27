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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pessoas: Observable<Pessoa[]>;
  teste: Pessoa[];
  constructor(
    private pessoasService: PessoasService,
    private authService: AuthenticationService
  ) {
    this.pessoas = this.pessoasService.getPessoas();
    this.authService.teste();
    this.pessoasService.getPessoas().subscribe(dados => {
      this.teste = dados;
      console.log(this.teste);
    });
  }

  ngOnInit() {
  }

}
