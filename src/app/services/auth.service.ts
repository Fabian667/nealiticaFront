import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth-token';
  private currentUserSubject = new BehaviorSubject<any>(null);

  constructor(private apiService: ApiService) {
    const savedToken = localStorage.getItem(this.tokenKey);
    if (savedToken) {
      // Decode token or just assume logged in for now
      this.currentUserSubject.next({ token: savedToken });
    }
  }

  login(credentials: any): Observable<any> {
    return this.apiService.login(credentials).pipe(
      tap(response => {
        if (response && response.accessToken) {
          localStorage.setItem(this.tokenKey, response.accessToken);
          this.currentUserSubject.next(response);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
