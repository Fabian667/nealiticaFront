import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlianzasService } from '../../core/services/alianzas.service';
import { Alianza } from '../../core/models/alianza.model';

@Component({
  selector: 'app-alianzas',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="page-header">
      <div class="container">
        <h1>Nuestras Alianzas</h1>
        <p>Colaboramos con organizaciones líderes</p>
      </div>
    </section>

    <section class="page-content">
      <div class="container">
        <div *ngIf="loading" class="loading-message">
          <p>Cargando alianzas...</p>
        </div>
        
        <div *ngIf="error" class="error-message">
          <p>{{ error }}</p>
        </div>

        <div *ngIf="!loading && !error && alianzas.length === 0" class="empty-message">
          <p>No hay alianzas registradas.</p>
        </div>

        <div class="alianzas-grid" *ngIf="!loading && !error && alianzas.length > 0">
          <div class="alianza-card" *ngFor="let alianza of alianzas">
            <div class="logo-container">
              <img *ngIf="alianza.logoUrl" [src]="alianza.logoUrl" [alt]="alianza.nombre">
              <div *ngIf="!alianza.logoUrl" class="logo-placeholder">
                {{ alianza.nombre.charAt(0) }}
              </div>
            </div>
            <div class="card-body">
              <h3>{{ alianza.nombre }}</h3>
              
              <div class="card-footer-action">
                <a [href]="alianza.urlSitio" target="_blank" class="card-link" *ngIf="alianza.urlSitio">
                  Visitar Sitio
                  <span class="arrow">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      --primary-bg: #001220;
      --card-bg: #001e30;
      --accent-color: #D65A31;
      --text-color: #ffffff;
      --text-muted: #b0b0b0;
    }

    .page-header {
      background-color: var(--primary-bg);
      color: var(--text-color);
      padding: 100px 0 60px;
      text-align: center;
    }

    .page-header h1 {
      font-size: 3rem;
      margin-bottom: 15px;
      font-weight: 700;
      letter-spacing: 1px;
    }

    .page-header p {
      color: var(--text-muted);
      font-size: 1.2rem;
    }

    .page-content {
      background-color: var(--primary-bg);
      padding-bottom: 100px;
      min-height: 60vh;
    }

    .alianzas-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
      margin-top: 20px;
    }

    .alianza-card {
      background: var(--card-bg);
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      padding: 30px;
      transition: transform 0.3s ease;
      border-top: 4px solid var(--accent-color);
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .alianza-card:hover {
      transform: translateY(-5px);
    }

    .logo-container {
      width: 120px;
      height: 120px;
      background: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      overflow: hidden;
      padding: 10px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }

    .logo-container img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }

    .logo-placeholder {
      width: 100%;
      height: 100%;
      background: var(--accent-color);
      color: white;
      font-size: 3rem;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .card-body h3 {
      color: var(--text-color);
      font-size: 1.4rem;
      margin-bottom: 20px;
    }

    .card-footer-action {
      margin-top: auto;
    }

    .card-link {
      color: var(--accent-color);
      text-decoration: none;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: gap 0.3s ease;
    }

    .card-link:hover {
      gap: 12px;
    }

    .arrow {
      font-size: 1.2rem;
    }

    .loading-message, .error-message, .empty-message {
      text-align: center;
      padding: 40px;
      color: var(--text-color);
      font-size: 1.2rem;
    }
    
    .error-message {
      color: #ff6b6b;
    }
  `]
})
export class AlianzasComponent implements OnInit {
  alianzas: Alianza[] = [];

  loading = true;
  error = '';

  constructor(private alianzasService: AlianzasService) {}

  ngOnInit(): void {
    this.alianzasService.getAll().subscribe({
      next: (data) => {
        this.alianzas = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar alianzas:', err);
        this.error = 'No se pudieron cargar las alianzas.';
        this.loading = false;
      }
    });
  }
}
