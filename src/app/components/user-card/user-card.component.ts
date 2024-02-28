import { Component, Input } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="user-card">
      <div class="avatar">
        <img [src]="user.avatar" alt="User Avatar" />
      </div>
      <div class="user-info">
        <h3>{{ user.name }}</h3>
        <a (onClick)="onMmyProfile()">Ver Perfil</a>
      </div>
    </div>
  `,
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input() user!: User;

  constructor(private router: Router) {}

  onMmyProfile() {
    this.router.navigate([`user/${this.user?.id}`]);
  }
}
