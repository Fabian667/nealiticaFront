import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header>
      <div class="container nav-container">
        <a routerLink="/" class="logo">
          <img src="assets/images/Nealitica.ico" alt="Nealitica">
        </a>
        
        <button class="mobile-menu-btn" (click)="toggleMenu()" [class.active]="isMenuOpen" aria-label="Toggle menu">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </button>

        <div class="nav-overlay" [class.active]="isMenuOpen" (click)="closeMenu()"></div>

        <nav class="nav-menu" [class.active]="isMenuOpen">
          <ul class="nav-links">
            <li><a routerLink="/" (click)="closeMenu()">Inicio</a></li>
            <li><a routerLink="/servicios" (click)="closeMenu()">Servicios</a></li>
            <li><a routerLink="/informes" (click)="closeMenu()">Informes</a></li>
            <li><a routerLink="/noticias" (click)="closeMenu()">Noticias</a></li>
            <li><a routerLink="/alianzas" (click)="closeMenu()">Alianzas</a></li>
            <li><a routerLink="/contacto" (click)="closeMenu()">Contacto</a></li>
            <li *ngIf="!isAuthenticated()"><a routerLink="/login" class="login-btn" (click)="closeMenu()">Ingresar</a></li>
            <li *ngIf="isAuthenticated()"><a routerLink="/admin" class="admin-btn" (click)="closeMenu()">Admin</a></li>
            <li *ngIf="isAuthenticated()"><a (click)="logout()" class="logout-btn">Salir</a></li>
          </ul>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    header {
      background-color: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
      position: sticky;
      top: 0;
      z-index: 1000;
      height: 80px;
      transition: all 0.3s ease;
      border-bottom: 2px solid #D60000;
    }

    .nav-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      width: 90%;
      max-width: 1200px;
      margin: 0 auto;
    }

    .logo {
      text-decoration: none;
      display: flex;
      align-items: center;
      z-index: 1001;
    }

    .logo img {
      height: 45px;
      width: auto;
    }

    .nav-menu {
      display: flex;
      align-items: center;
    }

    .nav-links {
      list-style: none;
      display: flex;
      gap: 30px;
      margin: 0;
      padding: 0;
    }

    .nav-links a {
      text-decoration: none;
      color: #333333;
      font-weight: 500;
      font-size: 0.95rem;
      letter-spacing: 1px;
      text-transform: uppercase;
      transition: color 0.3s, opacity 0.3s;
      cursor: pointer;
      padding: 5px 0;
      position: relative;
    }

    .nav-links a:hover {
      color: #D60000;
      opacity: 1;
    }
    
    .login-btn, .admin-btn {
      background-color: #D60000;
      color: white !important;
      padding: 8px 16px !important;
      border-radius: 4px;
      transition: background-color 0.3s !important;
    }
    
    .login-btn:hover, .admin-btn:hover {
      background-color: #b30000;
    }
    
    .logout-btn {
      color: #666 !important;
      font-size: 0.85rem !important;
    }
    
    .logout-btn:hover {
      color: #D60000 !important;
    }

    .mobile-menu-btn {
      display: none;
      flex-direction: column;
      justify-content: space-between;
      width: 30px;
      height: 21px;
      background: transparent;
      border: none;
      cursor: pointer;
      z-index: 1002;
      padding: 0;
    }

    .mobile-menu-btn .bar {
      width: 100%;
      height: 3px;
      background-color: #333333;
      border-radius: 3px;
      transition: all 0.3s ease-in-out;
    }

    .mobile-menu-btn.active .bar:nth-child(1) {
      transform: translateY(9px) rotate(45deg);
    }

    .mobile-menu-btn.active .bar:nth-child(2) {
      opacity: 0;
    }

    .mobile-menu-btn.active .bar:nth-child(3) {
      transform: translateY(-9px) rotate(-45deg);
    }

    .nav-overlay {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
      z-index: 998;
      opacity: 0;
      transition: opacity 0.3s;
    }

    .nav-overlay.active {
      display: block;
      opacity: 1;
    }

    @media (max-width: 768px) {
      .mobile-menu-btn {
        display: flex;
      }

      .nav-menu {
        position: fixed;
        top: 0;
        right: -100%;
        width: 280px;
        height: 100vh;
        background-color: #001220;
        flex-direction: column;
        justify-content: flex-start;
        padding-top: 80px;
        transition: right 0.3s ease-in-out;
        box-shadow: -2px 0 5px rgba(0,0,0,0.2);
        z-index: 999;
      }

      .nav-menu.active {
        right: 0;
      }

      .nav-links {
        flex-direction: column;
        width: 100%;
        gap: 0;
      }

      .nav-links li {
        width: 100%;
        border-bottom: 1px solid rgba(255,255,255,0.1);
      }

      .nav-links a {
        display: block;
        padding: 20px 30px;
        font-size: 1.1rem;
        color: #ffffff;
      }

      .nav-links a:hover {
        background-color: rgba(255,255,255,0.05);
      }
    }
  `]
})
export class NavbarComponent {
  isMenuOpen = false;

  constructor(private authService: AuthService, private router: Router) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
  }

  closeMenu() {
    this.isMenuOpen = false;
    document.body.style.overflow = '';
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
    this.closeMenu();
  }
}
