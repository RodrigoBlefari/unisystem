import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  private userSubject: BehaviorSubject<User | null>;

  constructor() {
    this.userSubject = new BehaviorSubject<User | null>(null);
  }

  setUser(user: User) {
    this.userSubject.next(user);
  }

  getUser(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  clearUser(): void {
    this.userSubject.next(null); // Limpa o estado do usuário
  }
}
