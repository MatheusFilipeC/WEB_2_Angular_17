import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Login } from '../../shared/models';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  @ViewChild('formLogin') formLogin! : NgForm;
  login: Login = new Login();
  loading: boolean = false;
  message!: string;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute) { }

    ngOnInit(): void {
      if (this.loginService.usuarioLogado) {
        this.router.navigate( ["/login"]);
      }
      else {
        this.route.queryParams.subscribe(
          params => {
            this.message = params['error'];
          });
      }
    }

    logar(): void {
      this.loading = true;
      if (this.formLogin.form.valid) {
        this.loginService.login(this.login).subscribe((usu) => {
          if (usu != null) {
            this.loginService.usuarioLogado = usu;
            this.loading = false;
            this.router.navigate( ["/login"] );
          }
          else {
            this.message = "Usuário/Senha inválidos.";
          }
        });
      }
      this.loading = false;
    }
}
