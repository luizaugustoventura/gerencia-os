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
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.pessoas = this.pessoasService.getPessoas();
  }

  ngOnInit() {
    if(!this.authService.getSessao()) {
      console.log('Por favor, efetue login antes!');
      this.router.navigate(['']);
    }
    else {
      console.log('Sessão iniciada');
      console.log(this.authService.getSessao());
    }
  }

}
