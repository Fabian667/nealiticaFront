import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="admin-container">
      <div class="dashboard-header">
        <h1>Panel de Administración</h1>
        <p>Gestiona el contenido de tu sitio web desde aquí.</p>
      </div>

      <div class="dashboard-grid">
        <a routerLink="/admin/servicios" class="dashboard-card">
          <div class="icon">🛠️</div>
          <h3>Servicios</h3>
          <p>Administrar servicios ofrecidos</p>
        </a>
        
        <a routerLink="/admin/noticias" class="dashboard-card">
          <div class="icon">📰</div>
          <h3>Noticias</h3>
          <p>Publicar y editar noticias</p>
        </a>
        
        <a routerLink="/admin/informes" class="dashboard-card">
          <div class="icon">📊</div>
          <h3>Informes</h3>
          <p>Subir informes y documentos</p>
        </a>
        
        <a routerLink="/admin/alianzas" class="dashboard-card">
          <div class="icon">🤝</div>
          <h3>Alianzas</h3>
          <p>Gestionar partners y alianzas</p>
        </a>
      </div>
    </div>
  `,
  styles: [`
    .admin-container {
      padding: 40px 20px;
      max-width: 1200px;
      margin: 0 auto;
      min-height: 80vh;
    }

    .dashboard-header {
      margin-bottom: 40px;
      text-align: center;
    }

    .dashboard-header h1 {
      color: #001220;
      margin-bottom: 10px;
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
    }

    .dashboard-card {
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      text-decoration: none;
      color: inherit;
      transition: transform 0.3s, box-shadow 0.3s;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      border-top: 4px solid #D60000;
    }

    .dashboard-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    }

    .icon {
      font-size: 3rem;
      margin-bottom: 15px;
    }

    .dashboard-card h3 {
      margin-bottom: 10px;
      color: #001220;
    }

    .dashboard-card p {
      color: #666;
      font-size: 0.9rem;
    }
  `]
})
export class DashboardComponent {}
