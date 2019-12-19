/*
  Código fonte escrito por Luiz Augusto Ventura
  Contato: luizaugustoventu1998@hotmail.com
  https://luizaugustoventura.com.br

  "No que diz respeito ao empenho, ao compromisso, ao esforço, à dedicação, não existe meio termo.
  Ou você faz uma coisa bem feita ou não faz." Ayrton Senna
*/

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';
import { Login } from 'src/app/models/Login/login';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/ToastController/toast.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      senha: new FormControl('', Validators.required)
    });
  }

  login(usuario: any) {
    this.authService.logIn(usuario.email, usuario.senha)
    .then(querySnapshot => {
      if(querySnapshot.size > 0) {
        querySnapshot.forEach(doc => {
          let login: Login = {
            id: doc.id,
            nome: doc.data().nome,
            email: doc.data().email,
            funcao: doc.data().funcao
          };

          this.authService.setSessao(login);
          this.router.navigate(['/home']);
        });
      }
      else {
        this.toastService.show(false, 'Dados de login inválidos');
      }
    })
    .catch(error => {
      console.log(error);
    });
  }

}
