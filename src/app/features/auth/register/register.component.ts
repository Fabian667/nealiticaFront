import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <h2>Registro</h2>
        <form (ngSubmit)="register()">
          <div class="form-group">
            <label for="username">Usuario</label>
            <input type="text" id="username" [(ngModel)]="userData.username" name="username" required>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" [(ngModel)]="userData.email" name="email" required>
          </div>
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input type="password" id="password" [(ngModel)]="userData.password" name="password" required>
          </div>
          <div *ngIf="errorMessage" class="error">{{ errorMessage }}</div>
          <button type="submit" class="auth-btn">Registrarse</button>
        </form>
        <p class="auth-link">¿Ya tienes cuenta? <a routerLink="/login">Inicia Sesión</a></p>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 80vh;
      background-color: #f4f4f4;
    }
    .auth-card {
      background: white;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 400px;
    }
    h2 {
      text-align: center;
      margin-bottom: 20px;
      color: var(--primary-color);
    }
    .form-group {
      margin-bottom: 15px;
    }
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
    }
    input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .auth-btn {
      width: 100%;
      padding: 12px;
      background-color: var(--secondary-color);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      margin-top: 10px;
    }
    .error {
      color: red;
      font-size: 0.9rem;
      margin-bottom: 10px;
    }
    .auth-link {
      text-align: center;
      margin-top: 15px;
      font-size: 0.9rem;
    }
  `]
})
export class RegisterComponent {
  userData = { username: '', email: '', password: '', role: ['user'] };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.userData).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => this.errorMessage = 'Error en el registro. Intenta nuevamente.'
    });
  }
}
