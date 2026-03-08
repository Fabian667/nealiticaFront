import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { SEED_SERVICIOS, SEED_NOTICIAS, SEED_INFORMES, SEED_ALIANZAS } from '../../data/seed-data';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="admin-container">
      <h1>Panel de Administración</h1>
      <p>Bienvenido al panel de control de Nealitica.</p>
      
      <div class="actions">
        <div class="card">
          <h3>Inicialización de Datos</h3>
          <p>Utiliza esta opción para cargar los datos de prueba (Servicios, Noticias, Informes) en la base de datos si está vacía.</p>
          <button (click)="seedData()" [disabled]="loading" class="btn-primary">
            {{ loading ? 'Cargando...' : 'Cargar Datos Iniciales' }}
          </button>
          <div *ngIf="message" [class]="success ? 'success' : 'error'">
            {{ message }}
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-container {
      padding: 40px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .card {
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin-top: 20px;
    }
    .btn-primary {
      background-color: #003366;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      margin-top: 15px;
    }
    .btn-primary:disabled {
      background-color: #cccccc;
    }
    .success {
      color: green;
      margin-top: 10px;
      font-weight: bold;
    }
    .error {
      color: red;
      margin-top: 10px;
      font-weight: bold;
    }
  `]
})
export class AdminComponent {
  loading = false;
  message = '';
  success = false;

  constructor(private apiService: ApiService) {}

  seedData() {
    if (!confirm('¿Estás seguro de que quieres cargar los datos iniciales? Esto creará registros en la base de datos.')) {
      return;
    }

    this.loading = true;
    this.message = 'Iniciando carga de datos...';
    
    const observables: Observable<any>[] = [];

    // Queue Servicios
    SEED_SERVICIOS.forEach(s => observables.push(this.apiService.createServicio(s)));
    
    // Queue Noticias
    SEED_NOTICIAS.forEach(n => observables.push(this.apiService.createNoticia(n)));
    
    // Queue Informes
    SEED_INFORMES.forEach(i => observables.push(this.apiService.createInforme(i)));

    // Queue Alianzas
    SEED_ALIANZAS.forEach(a => observables.push(this.apiService.createAlianza(a)));

    if (observables.length === 0) {
      this.loading = false;
      this.message = 'No hay datos para cargar en seed-data.ts';
      return;
    }

    forkJoin(observables).subscribe({
      next: (results) => {
        this.loading = false;
        this.success = true;
        this.message = `¡Éxito! Se han creado ${results.length} registros correctamente.`;
      },
      error: (err) => {
        this.loading = false;
        this.success = false;
        this.message = 'Error al cargar algunos datos. Verifica la consola y asegúrate de estar logueado como Admin.';
        console.error(err);
      }
    });
  }
}
