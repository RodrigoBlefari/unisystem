import { Component, Input } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-info-card',
  standalone: true,
  imports: [],
  template: ` <div class="user-card">
    <div class="avatar">
      <img [src]="user.avatar" alt="User Avatar" />
    </div>
    <div class="user-info">
      <section class="info">
        <h3>Usuario: {{ user.name }}</h3>
        <h4>Password: {{ user.password }}</h4>
      </section>
      <section class="buttons">
        <a (click)="goBack()" (keydown.escape)="goBack()" tabindex="0"
          >Voltar</a
        >
      </section>
    </div>
  </div>`,
  styleUrl: './user-info-card.component.scss',
})
export class UserInfoCardComponent {
  @Input() user!: User;
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
