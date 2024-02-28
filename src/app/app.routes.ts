import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TelaLoginComponent } from './components/tela-login/tela-login.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
export const routes: Routes = [
  {
    path: '',
    component: TelaLoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'user/:id',
    component: UserInfoComponent,
  },
  {
    path: '**', // Rota curinga para capturar rotas não encontradas
    redirectTo: '', // Redireciona para a página inicial caso a rota não seja encontrada
  },
];
