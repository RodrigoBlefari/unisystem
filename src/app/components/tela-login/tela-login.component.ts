import { Component } from '@angular/core';
import { FormularioComponent } from '../formulario/formulario.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tela-login',
  standalone: true,
  imports: [FormularioComponent, CommonModule],
  template: `
    <section class="section-main">
      <article class="article-info">
        <title>{{ welcomeText | uppercase }}</title>
        <h1 for="">{{ welcomeText | uppercase }}</h1>
        <section class="form">
          <app-formulario></app-formulario>
        </section>
      </article>
    </section>
  `,
  styleUrl: './tela-login.component.scss',
})
export class TelaLoginComponent {
  welcomeText: string = 'Cadastro';
}
