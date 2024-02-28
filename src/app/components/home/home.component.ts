import { Component } from '@angular/core';
import { FormularioComponent } from '../formulario/formulario.component';
import { UserStateService } from '../../services/user-state.service';
import { User } from '../../interfaces/user.interface';
import { Router } from '@angular/router';
import { UserCardComponent } from '../user-card/user-card.component';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormularioComponent, UserCardComponent, CommonModule],
  template: ` <section class="section-main">
    <article class="article-info">
      <title>{{ welcomeText | uppercase }}</title>
      <h1 for="">Bem vindo</h1>
      <a (click)="logOut()">LogOut</a>
      <section class="user-card">
        <app-user-card [user]="user"></app-user-card>
      </section>
    </article>
  </section>`,
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  user!: User;
  welcomeText: string = 'Bem vindo';
  private userSubscription: Subscription | null = null;

  constructor(
    private userStateService: UserStateService,
    private route: Router
  ) {
    this.userStateService.getUser().subscribe((user) => {
      if (!user) {
        this.route.navigate(['/']);
        this.user = {
          id: 'dsadsadsadsa',
          name: 'Rodrigo',
          password: 'secret',
          avatar: 'assets/default-user.png',
        };
      } else {
        this.user = user;
        console.log(this.user);
      }
    });
  }

  ngOnDestroy(): void {
    // Cancela a inscrição para evitar vazamentos de memória
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  logOut(): void {
    // Limpa o estado do usuário e navega para a página de login
    this.userStateService.clearUser();
    this.route.navigate(['/']);
  }
}
