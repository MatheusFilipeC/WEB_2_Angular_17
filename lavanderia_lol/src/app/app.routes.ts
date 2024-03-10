import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AutoCadastroComponent } from './pages/auto-cadastro/auto-cadastro.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'home',
    component: HomeComponent
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'cadastro',
    component: AutoCadastroComponent
  }

];
