import { Component, OnDestroy, OnInit } from '@angular/core';
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
      <h1 for="">{{ welcomeText | uppercase }}</h1>
      <a (click)="logOut()" (keydown.escape)="logOut()" tabindex="0">LogOut</a>
      <section class="user-card">
        <app-user-card [user]="user"></app-user-card>
      </section>
    </article>
  </section>`,
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  user: User | null = null;
  welcomeText: string = 'Bem vindo';
  userSubscription: Subscription = new Subscription();
  loggingOut: boolean = false;

  constructor(
    public userStateService: UserStateService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.userStateService
      .getUser()
      .subscribe((user) => {
        if (user) {
          this.user = user;
        } else if (!this.loggingOut) {
          this.logOut();
        }
      });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  logOut(): void {
    if (this.user) {
      this.loggingOut = true;
      this.userStateService.clearUser();
      this.user = null;
      this.router.navigate(['/']);
    }
  }
}
