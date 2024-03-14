import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AutoCadastroComponent } from './pages/auto-cadastro/auto-cadastro.component';
import { HomeComponent } from './pages/home/home.component';
import { InicialClienteComponent } from './pages/inicial-cliente/inicial-cliente.component';
import { NovoPedidoClienteComponent } from './pages/novo-pedido-cliente/novo-pedido-cliente.component';

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
  },

  {
    path: 'inicialCliente',
    component: InicialClienteComponent
  },
  {
    path: 'novoPedido',
    component: NovoPedidoClienteComponent
  }


];
