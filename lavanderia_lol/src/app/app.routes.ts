import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AutoCadastroComponent } from './pages/auto-cadastro/auto-cadastro.component';
import { HomeComponent } from './pages/home/home.component';
import { InicialClienteComponent } from './pages/inicial-cliente/inicial-cliente.component';
import { NovoPedidoClienteComponent } from './pages/novo-pedido-cliente/novo-pedido-cliente.component';
import { ConsultaPedidoClienteComponent } from './pages/consulta-pedido-cliente/consulta-pedido-cliente.component';
import { ListagemPedidosClienteComponent } from './pages/listagem-pedidos-cliente/listagem-pedidos-cliente.component';
import { authGuard } from './auth/auth.guard';
import { InicialFuncionarioComponent } from './pages/inicial-funcionario/inicial-funcionario.component';
import { ManutencaoFuncionariosComponent } from './pages/manutencao-funcionarios/manutencao-funcionarios.component';
import { ManutencaoRoupasFuncionarioComponent } from './pages/manutencao-roupas-funcionario/manutencao-roupas-funcionario.component';
import { RelatorioFuncionarioComponent } from './pages/relatorio-funcionario/relatorio-funcionario.component';
import { VisualizacaoPedidosFuncionarioComponent } from './pages/visualizacao-pedidos-funcionario/visualizacao-pedidos-funcionario.component';

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
    path: 'cliente',
    redirectTo: 'cliente/inicial' 
  },

  {
    path: 'cliente/inicial',
    component: InicialClienteComponent,
    canActivate: [authGuard],
    data: {
      role: 'CLIENTE'
    } 
  },
  
  {
    path: 'cliente/novo',
    component: NovoPedidoClienteComponent,
    canActivate: [authGuard],
    data: {
      role: 'CLIENTE'
    } 
  },

  {
    path: 'cliente/consulta',
    component: ConsultaPedidoClienteComponent,
    canActivate: [authGuard],
    data: {
      role: 'CLIENTE'
    } 
  },

  {
    path: 'cliente/listagem',
    component: ListagemPedidosClienteComponent,
    canActivate: [authGuard],
    data: {
      role: 'CLIENTE'
    } 
  },

  { 
    path: 'funcionario',
    redirectTo: 'funcionario/inicial' 
  },

  { 
    path: 'funcionario/inicial', 
    component: InicialFuncionarioComponent,
    canActivate: [authGuard],
    data: {
      role: 'FUNC'
    }  
  },

  { 
    path: 'funcionario/manutencao', 
    component: ManutencaoFuncionariosComponent,
    canActivate: [authGuard],
    data: {
      role: 'FUNC'
    }   },

  { 
    path: 'funcionario/roupas', 
    component: ManutencaoRoupasFuncionarioComponent,
    canActivate: [authGuard],
    data: {
      role: 'FUNC'
    }   
  },

  { 
    path: 'funcionario/relatorios', 
    component: RelatorioFuncionarioComponent,
    canActivate: [authGuard],
    data: {
      role: 'FUNC'
    }   
  },

  { 
    path: 'funcionario/visualizacao', 
    component: VisualizacaoPedidosFuncionarioComponent,
    canActivate: [authGuard],
    data: {
      role: 'FUNC'
    }   
  },
];