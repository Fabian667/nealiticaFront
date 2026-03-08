import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <h2>Iniciar Sesión</h2>
        <form (ngSubmit)="login()">
          <div class="form-group">
            <label for="username">Usuario</label>
            <input type="text" id="username" [(ngModel)]="credentials.username" name="username" required>
          </div>
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input type="password" id="password" [(ngModel)]="credentials.password" name="password" required>
          </div>
          <div *ngIf="errorMessage" class="error">{{ errorMessage }}</div>
          <button type="submit" class="auth-btn">Ingresar</button>
        </form>
        <p class="auth-link">¿No tienes cuenta? <a routerLink="/register">Regístrate</a></p>
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
export class LoginComponent {
  credentials = { username: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.credentials).subscribe({
      next: () => {
        console.log('Login exitoso');
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        console.error('Login error:', err);
        this.errorMessage = 'Credenciales inválidas o error de conexión';
      }
    });
  }
}
