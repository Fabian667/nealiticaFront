import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformesService } from '../../core/services/informes.service';
import { Informe } from '../../core/models/informe.model';

@Component({
  selector: 'app-informes',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="page-header">
      <div class="container">
        <h1>Informes y Publicaciones</h1>
        <p>Análisis detallados y estudios estratégicos</p>
      </div>
    </section>

    <section class="page-content">
      <div class="container">
        <div *ngIf="loading" class="loading-message">
          <p>Cargando informes...</p>
        </div>
        
        <div *ngIf="error" class="error-message">
          <p>{{ error }}</p>
        </div>

        <div *ngIf="!loading && !error && informes.length === 0" class="empty-message">
          <p>No hay informes disponibles.</p>
        </div>

        <div class="informes-grid" *ngIf="!loading && !error && informes.length > 0">
          <div class="informe-card" *ngFor="let informe of informes">
            <div class="card-icon">
              <i class="far fa-file-pdf"></i>
            </div>
            <div class="card-body">
              <span class="informe-date">{{ informe.fechaPublicacion | date:'MMMM yyyy' }}</span>
              <h3>{{ informe.titulo }}</h3>
              <p>{{ informe.descripcion }}</p>
              
              <div class="card-footer-action">
                <a [href]="informe.archivoUrl" target="_blank" class="card-link">
                  Descargar Informe
                  <span class="arrow">↓</span>
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

    .informes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 30px;
      margin-top: 20px;
    }

    .informe-card {
      background: var(--card-bg);
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      padding: 30px;
      transition: transform 0.3s ease;
      border-top: 4px solid var(--accent-color);
      display: flex;
      flex-direction: column;
      position: relative;
    }

    .informe-card:hover {
      transform: translateY(-5px);
    }

    .card-icon {
      width: 50px;
      height: 50px;
      background-color: rgba(214, 90, 49, 0.1);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--accent-color);
      font-size: 1.5rem;
      margin-bottom: 20px;
    }

    .informe-date {
      color: var(--accent-color);
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 600;
      margin-bottom: 10px;
      display: block;
    }

    .card-body h3 {
      color: var(--text-color);
      font-size: 1.4rem;
      margin-bottom: 15px;
      line-height: 1.3;
    }

    .card-body p {
      color: var(--text-muted);
      font-size: 0.95rem;
      line-height: 1.6;
      margin-bottom: 30px;
    }

    .card-footer-action {
      margin-top: auto;
    }

    .card-link {
      color: var(--text-color);
      text-decoration: none;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 10px 20px;
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 30px;
      transition: all 0.3s ease;
      background: rgba(255,255,255,0.05);
    }

    .card-link:hover {
      background: var(--accent-color);
      border-color: var(--accent-color);
      color: white;
    }

    .arrow {
      font-size: 1.1rem;
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
export class InformesComponent implements OnInit {
  informes: Informe[] = [];

  loading = true;
  error = '';

  constructor(private informesService: InformesService) {}

  ngOnInit(): void {
    this.informesService.getAll().subscribe({
      next: (data) => {
        this.informes = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar informes:', err);
        this.error = 'No se pudieron cargar los informes.';
        this.loading = false;
      }
    });
  }
}
