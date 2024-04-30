import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LoginService } from './services';
import { Usuario } from './shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NgbModule,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Lavaneria LOL';

  constructor(
    private router: Router,
    private loginService: LoginService) { }

    get usuarioLogado(): Usuario | null {
      return this.loginService.usuarioLogado;
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/home']);
  }
  temPermissao(...perfis: string[]): boolean {
    let usu = this.usuarioLogado;
    if (usu != null && perfis.length > 0) {
      for (let p of perfis) {
        if (usu.perfil.indexOf(p) != -1) {
          return true;
        }
      }
    }
    return false;
  }
}
