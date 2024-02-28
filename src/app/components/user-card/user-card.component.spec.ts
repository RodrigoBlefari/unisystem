import { TestBed, ComponentFixture } from '@angular/core/testing';
import { UserCardComponent } from './user-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [RouterTestingModule, UserCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to user profile when "Ver Perfil" link is clicked', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const user: User = {
      id: 'idtesteAscas',
      password: 'PassTest',
      name: 'Test User',
      avatar: 'test-avatar.jpg',
    };
    component.user = user;
    fixture.detectChanges();

    const link = fixture.nativeElement.querySelector('a');
    link.click();

    expect(navigateSpy).toHaveBeenCalledWith(['user/idtesteAscas']); // Corrigido aqui
  });
});
