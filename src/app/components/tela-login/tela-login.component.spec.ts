import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TelaLoginComponent } from './tela-login.component';
import { FormularioComponent } from '../formulario/formulario.component';

describe('TelaLoginComponent', () => {
  let component: TelaLoginComponent;
  let fixture: ComponentFixture<TelaLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaLoginComponent, FormularioComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Rendering', () => {
    it('should display welcome text in uppercase', () => {
      const titleElement: HTMLElement =
        fixture.nativeElement.querySelector('title');
      const h1Element: HTMLElement = fixture.nativeElement.querySelector('h1');
      expect(titleElement.textContent?.trim()).toBe('CADASTRO');
      expect(h1Element.textContent?.trim()).toBe('CADASTRO');
    });

    it('should render the app-formulario component', () => {
      const formularioComponent =
        fixture.nativeElement.querySelector('app-formulario');
      expect(formularioComponent).toBeTruthy();
    });
  });
});
