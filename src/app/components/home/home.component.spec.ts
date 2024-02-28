import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { UserStateService } from '../../services/user-state.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { User } from '../../interfaces/user.interface';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let userStateServiceSpy: jasmine.SpyObj<UserStateService>;

  beforeEach(async () => {
    const userStateServiceSpyObj = jasmine.createSpyObj('UserStateService', [
      'getUser',
      'clearUser',
    ]);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: UserStateService, useValue: userStateServiceSpyObj },
        { provide: Router, useValue: routerSpyObj },
      ],
    }).compileComponents();

    userStateServiceSpy = TestBed.inject(
      UserStateService
    ) as jasmine.SpyObj<UserStateService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set user if user is retrieved', () => {
      const testUser: User = {
        id: 'c412dsa4dsacsa412',
        name: 'Rodrigo',
        password: 'secret',
        avatar: 'assets/default-user.png',
      };
      userStateServiceSpy.getUser.and.returnValue(of(testUser));

      fixture.detectChanges();

      expect(component.user).toEqual(testUser);
    });

    it('should call logOut if no user is retrieved', () => {
      userStateServiceSpy.getUser.and.returnValue(of(null));
      spyOn(component, 'logOut');

      fixture.detectChanges();

      expect(component.logOut).toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe from user subscription', () => {
      spyOn(component.userSubscription, 'unsubscribe');

      component.ngOnDestroy();

      expect(component.userSubscription.unsubscribe).toHaveBeenCalled();
    });
  });

  afterEach(() => {
    fixture.destroy();
  });
});
