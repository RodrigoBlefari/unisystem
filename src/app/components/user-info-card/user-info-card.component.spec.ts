import { TestBed, ComponentFixture } from '@angular/core/testing';
import { UserInfoCardComponent } from './user-info-card.component';
import { User } from '../../interfaces/user.interface';
import { DebugElement } from '@angular/core';
import { Location } from '@angular/common';

describe('UserInfoCardComponent', () => {
  let component: UserInfoCardComponent;
  let fixture: ComponentFixture<UserInfoCardComponent>;
  let debugElement: DebugElement;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserInfoCardComponent],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoCardComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    location = TestBed.inject(Location);
  });

  it('should go back when "Voltar" link is clicked', () => {
    const user: User = {
      id: '123',
      name: 'Test User',
      password: 'pass123',
      avatar: 'test-avatar.jpg',
    };
    component.user = user;
    fixture.detectChanges();

    const link = debugElement.nativeElement.querySelector('.buttons a');
    const backSpy = spyOn(location, 'back');
    link.click();
    expect(backSpy).toHaveBeenCalled();
  });
});
