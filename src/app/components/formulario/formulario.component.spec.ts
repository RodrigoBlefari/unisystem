import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioComponent } from './formulario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserStateService } from '../../services/user-state.service';

describe('FormularioComponent', () => {
  let component: FormularioComponent;
  let fixture: ComponentFixture<FormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, FormularioComponent, CommonModule],
      providers: [
        { provide: Router, useValue: {} },
        { provide: UserStateService, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Validação', () => {
    it('Deve invalidar o formulário quando os campos estão vazios', () => {
      expect(component.formulario.valid).toBeFalsy();
    });

    it('Deve validar o formulário quando todos os campos estão preenchidos corretamente', () => {
      const name = component.formulario.controls['name'];
      const password = component.formulario.controls['password'];
      const confirmPassword = component.formulario.controls['confirmPassword'];

      name.setValue('John Doe');
      password.setValue('password123');
      confirmPassword.setValue('password123');

      expect(component.formulario.valid).toBeTruthy();
    });

    it('Deve invalidar o formulário quando as senhas não coincidem', () => {
      const name = component.formulario.controls['name'];
      const password = component.formulario.controls['password'];
      const confirmPassword = component.formulario.controls['confirmPassword'];

      name.setValue('John Doe');
      password.setValue('password123');
      confirmPassword.setValue('password456');

      expect(component.formulario.hasError('passwordMismatch')).toBeTruthy();
    });
  });
});
