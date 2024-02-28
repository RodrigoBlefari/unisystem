import { Component } from '@angular/core';
import { FormularioComponent } from '../formulario/formulario.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tela-login',
  standalone: true,
  imports: [FormularioComponent, CommonModule],
  template: ` <section class="form">
    <app-formulario></app-formulario>
  </section>`,
  styleUrl: './tela-login.component.scss',
})
export class TelaLoginComponent {
  welcomeText: string = 'Cadastro';
}
