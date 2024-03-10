import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AutoCadastroComponent } from './pages/auto-cadastro/auto-cadastro.component';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'autocadastro',
    component: AutoCadastroComponent
  }

];
