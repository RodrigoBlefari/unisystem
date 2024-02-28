import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { UserInfoComponent } from './user-info.component';
import { UserStateService } from '../../services/user-state.service';
import { User } from '../../interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { UserInfoCardComponent } from '../user-info-card/user-info-card.component';

describe('UserInfoComponent', () => {
  let component: UserInfoComponent;
  let fixture: ComponentFixture<UserInfoComponent>;
  let activatedRouteMock: Partial<ActivatedRoute>;
  let userStateServiceMock: Partial<UserStateService>;

  beforeEach(async () => {
    activatedRouteMock = {
      paramMap: of(convertToParamMap({ id: '123' })),
    };

    userStateServiceMock = {
      getUser: () =>
        of({
          id: 'user123',
          name: 'Test User',
          password: 'pass123',
          avatar: 'test-avatar.jpg',
        } as User),
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule, UserInfoComponent, UserInfoCardComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: UserStateService, useValue: userStateServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set welcome text to "Perfil"', () => {
    expect(component.welcomeText).toBe('Perfil');
  });

  it('should get user ID from route params', () => {
    expect(component.userId).toBe('123');
  });

  it('should get current user from user state service', () => {
    expect(component.currentUser).toEqual({
      id: 'user123',
      name: 'Test User',
      password: 'pass123',
      avatar: 'test-avatar.jpg',
    } as User);
  });
});
