import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NoticiasService } from '../../core/services/noticias.service';
import { Noticia } from '../../core/models/noticia.model';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="page-header">
      <div class="container">
        <h1>Noticias y Novedades</h1>
        <p>Mantente informado con las últimas actualizaciones</p>
      </div>
    </section>

    <section class="page-content">
      <div class="container">
        <div *ngIf="loading" class="loading-message">
          <p>Cargando noticias...</p>
        </div>
        
        <div *ngIf="error" class="error-message">
          <p>{{ error }}</p>
        </div>

        <div *ngIf="!loading && !error && noticias.length === 0" class="empty-message">
          <p>No hay noticias publicadas.</p>
        </div>

        <div class="news-grid" *ngIf="!loading && !error && noticias.length > 0">
          <div class="news-card" *ngFor="let noticia of noticias">
            <div class="card-icon" *ngIf="!noticia.imagenUrl">
              <i class="far fa-newspaper"></i>
            </div>
            <div class="news-image" *ngIf="noticia.imagenUrl" [style.backgroundImage]="'url(' + noticia.imagenUrl + ')'"></div>
            
            <div class="news-content">
              <div class="meta-info">
                <span class="news-date">{{ noticia.fechaPublicacion | date:'dd MMM, yyyy' }}</span>
              </div>
              <h3>{{ noticia.titulo }}</h3>
              <p>{{ noticia.contenido | slice:0:150 }}{{ noticia.contenido.length > 150 ? '...' : '' }}</p>
              
              <a [routerLink]="['/noticias', noticia.id]" class="card-link">
                Leer nota completa
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

    .news-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 40px;
      margin-top: 20px;
    }

    .news-card {
      background: var(--card-bg);
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      overflow: hidden;
      transition: transform 0.3s ease;
      border-top: 4px solid var(--accent-color);
      display: flex;
      flex-direction: column;
    }

    .news-card:hover {
      transform: translateY(-5px);
    }

    .news-image {
      height: 200px;
      background-size: cover;
      background-position: center;
      width: 100%;
    }

    .card-icon {
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(214, 90, 49, 0.05);
      color: var(--accent-color);
      font-size: 3rem;
    }

    .news-content {
      padding: 30px;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }

    .meta-info {
      margin-bottom: 15px;
    }

    .news-date {
      color: var(--accent-color);
      font-size: 0.85rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .news-content h3 {
      margin-bottom: 15px;
      color: var(--text-color);
      font-size: 1.4rem;
      line-height: 1.3;
    }

    .news-content p {
      color: var(--text-muted);
      line-height: 1.6;
      margin-bottom: 25px;
      flex-grow: 1;
    }

    .card-link {
      color: var(--accent-color);
      text-decoration: none;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: gap 0.3s ease;
      margin-top: auto;
      cursor: pointer;
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
export class NoticiasComponent implements OnInit {
  noticias: Noticia[] = [];

  loading = true;
  error = '';

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(): void {
    this.noticiasService.getAll().subscribe({
      next: (data) => {
        this.noticias = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar noticias:', err);
        this.error = 'No se pudieron cargar las noticias.';
        this.loading = false;
      }
    });
  }
}
