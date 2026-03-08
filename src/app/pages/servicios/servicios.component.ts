import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServiciosService } from '../../core/services/servicios.service';
import { Servicio } from '../../core/models/servicio.model';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="page-header">
      <div class="container">
        <h1>Nuestros Servicios</h1>
        <p>Soluciones integrales para tu negocio</p>
      </div>
    </section>

    <section class="page-content">
      <div class="container">
        <div *ngIf="loading" class="loading-message">
          <p>Cargando servicios...</p>
        </div>
        
        <div *ngIf="error" class="error-message">
          <p>{{ error }}</p>
        </div>

        <div *ngIf="!loading && !error && servicios.length === 0" class="empty-message">
          <p>No hay servicios disponibles en este momento.</p>
        </div>

        <div class="services-grid" *ngIf="!loading && !error && servicios.length > 0">
          <div class="service-card" *ngFor="let servicio of servicios">
            <div class="card-icon">
              <!-- Placeholder icon si no hay imagen, o usar imagen como icono -->
              <i class="fas fa-chart-line"></i> 
            </div>
            <div class="card-body">
              <h3>{{ servicio.titulo }}</h3>
              <p>{{ servicio.descripcion }}</p>
              
              <a [routerLink]="['/servicios', servicio.id]" class="card-link">
                Ver detalle
                <span class="arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      --primary-bg: #001220;
      --card-bg: #001e30; /* Un poco más claro que el fondo */
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

    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 30px;
      margin-top: 20px;
    }

    .service-card {
      background: var(--card-bg);
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      padding: 30px;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      position: relative;
      border-top: 4px solid var(--accent-color);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .service-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 40px rgba(0,0,0,0.4);
    }

    .card-icon {
      background-color: rgba(214, 90, 49, 0.1); /* Accent con opacidad */
      width: 60px;
      height: 60px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      color: var(--accent-color);
      font-size: 1.5rem;
    }

    .card-body h3 {
      color: var(--text-color);
      font-size: 1.5rem;
      margin-bottom: 15px;
      font-weight: 600;
    }

    .card-body p {
      color: var(--text-muted);
      font-size: 0.95rem;
      line-height: 1.6;
      margin-bottom: 25px;
    }

    .card-link {
      color: var(--accent-color);
      text-decoration: none;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: gap 0.3s ease;
      cursor: pointer;
    }

    .card-link:hover {
      gap: 12px;
    }

    .arrow {
      font-size: 1.2rem;
      line-height: 1;
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
export class ServiciosComponent implements OnInit {
  servicios: Servicio[] = [];

  loading = true;
  error = '';

  constructor(private serviciosService: ServiciosService) {}

  ngOnInit(): void {
    this.serviciosService.getAll().subscribe({
      next: (data) => {
        console.log('Servicios cargados:', data);
        this.servicios = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar servicios:', err);
        this.error = 'No se pudieron cargar los servicios. Por favor, intente más tarde.';
        this.loading = false;
      }
    });
  }
}
