import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserStateService } from '../../services/user-state.service';
import { User } from '../../interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { UserInfoCardComponent } from '../user-info-card/user-info-card.component';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule, UserInfoCardComponent],
  template: `<section class="section-main">
    <article class="article-info">
      <title>{{ welcomeText | uppercase }}</title>
      <h1 for="">{{ welcomeText | uppercase }}</h1>
      <section class="user-card">
        <app-user-info-card [user]="currentUser"></app-user-info-card>
      </section>
    </article>
  </section>`,
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  welcomeText: string = 'Perfil';
  userId: string | null = null;
  currentUser!: User;
  constructor(
    private route: ActivatedRoute,
    private userStateService: UserStateService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id');
    });
    this.userStateService.getUser().subscribe((user) => {
      if (user) {
        this.currentUser = user;
      } else {
        this.currentUser = {
          id: 'dsadsadsadsa',
          name: 'fasfas',
          password: '123',
          avatar: 'assets/default-user.png',
        };
      }
    });
  }
}
