import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { UserStateService } from '../../services/user-state.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormularioComponent } from '../formulario/formulario.component';
import { UserCardComponent } from '../user-card/user-card.component';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HomeComponent,
        FormularioComponent,
        UserCardComponent,
      ],
      providers: [
        {
          provide: UserStateService,
          useValue: { getUser: () => of(null), clearUser: () => {} },
        },
        { provide: Router, useValue: { navigate: () => {} } },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
