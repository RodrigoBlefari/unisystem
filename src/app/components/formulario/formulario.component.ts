import { Router } from '@angular/router';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../interfaces/user.interface';
import { UserStateService } from '../../services/user-state.service';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <form
      class="form-register"
      [formGroup]="formulario"
      (ngSubmit)="onSubmit()"
    >
      <label for="user">Nome Completo:</label>
      <section class="section-inputs">
        <div
          *ngIf="
            formulario.get('name')?.invalid &&
            (formulario.get('name')?.dirty || formulario.get('name')?.touched)
          "
          class="error-message"
        >
          Nome é obrigatório
        </div>
        <input
          type="text"
          id="user"
          formControlName="name"
          placeholder=" ..."
        />

        <label for="password">Senha:</label>
        <div
          *ngIf="
            formulario.get('password')?.invalid &&
            (formulario.get('password')?.dirty ||
              formulario.get('password')?.touched)
          "
          class="error-message"
        >
          Senha é obrigatória
        </div>
        <input
          type="password"
          id="password"
          formControlName="password"
          placeholder=" ..."
        />

        <label for="confirmPassword">Repetir senha:</label>
        <input
          type="password"
          id="confirmPassword"
          formControlName="confirmPassword"
          placeholder=" ..."
        />
        <div
          *ngIf="formulario.hasError('passwordMismatch')"
          class="error-message"
        >
          As senhas não coincidem
        </div>
      </section>
      <section class="section-buttons">
        <button type="submit" class="button primary">Criar Conta</button>
      </section>
    </form>
  `,
  styleUrl: './formulario.component.scss',
})
export class FormularioComponent {
  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userStateService: UserStateService,
    private router: Router
  ) {
    this.formulario = this.formBuilder.group(
      {
        name: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(group: FormGroup) {
    const passwordControl = group.get('password');
    const confirmPasswordControl = group.get('confirmPassword');

    if (
      passwordControl &&
      confirmPasswordControl &&
      passwordControl.value !== confirmPasswordControl.value
    ) {
      return { passwordMismatch: true };
    } else {
      return null;
    }
  }

  onSubmit() {
    if (this.formulario.valid) {
      const user: User = {
        id: 'dsadsadsadsa',
        name: this.formulario.value.name,
        password: this.formulario.value.password,
      };
      if (!user.avatar) user.avatar = 'assets/default-user.png';
      this.userStateService.setUser(user);
      this.router.navigate(['home']);
    } else {
      this.formulario.markAllAsTouched();
    }
  }
}
