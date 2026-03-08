import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiciosService } from '../../core/services/servicios.service';
import { Servicio } from '../../core/models/servicio.model';

@Component({
  selector: 'app-servicios-abm',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './servicios-abm.component.html',
  styleUrls: ['./servicios-abm.component.css']
})
export class ServiciosABMComponent implements OnInit {
  servicios: Servicio[] = [];
  currentServicio: Servicio = { id: 0, titulo: '', descripcion: '', imagenUrl: '', activo: true, orden: 0 };
  isEditing = false;
  isLoading = false;
  errorMessage = '';

  constructor(private serviciosService: ServiciosService) {}

  ngOnInit(): void {
    this.loadServicios();
  }

  loadServicios(): void {
    this.isLoading = true;
    this.serviciosService.getAll().subscribe({
      next: (data) => {
        this.servicios = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading servicios', err);
        this.errorMessage = 'Error al cargar los servicios.';
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.isEditing && this.currentServicio.id) {
      this.updateServicio();
    } else {
      this.createServicio();
    }
  }

  createServicio(): void {
    this.serviciosService.create(this.currentServicio).subscribe({
      next: (newServicio) => {
        this.servicios.push(newServicio);
        this.resetForm();
      },
      error: (err) => {
        console.error('Error creating servicio', err);
        this.errorMessage = 'Error al crear el servicio.';
      }
    });
  }

  updateServicio(): void {
    if (!this.currentServicio.id) return;
    this.serviciosService.update(this.currentServicio.id, this.currentServicio).subscribe({
      next: (updatedServicio) => {
        const index = this.servicios.findIndex(s => s.id === updatedServicio.id);
        if (index !== -1) {
          this.servicios[index] = updatedServicio;
        }
        this.resetForm();
      },
      error: (err) => {
        console.error('Error updating servicio', err);
        this.errorMessage = 'Error al actualizar el servicio.';
      }
    });
  }

  deleteServicio(id: number | undefined): void {
    if (!id) return;
    if (confirm('¿Estás seguro de que quieres eliminar este servicio?')) {
      this.serviciosService.delete(id).subscribe({
        next: () => {
          this.servicios = this.servicios.filter(s => s.id !== id);
        },
        error: (err) => {
          console.error('Error deleting servicio', err);
          this.errorMessage = 'Error al eliminar el servicio.';
        }
      });
    }
  }

  editServicio(servicio: Servicio): void {
    this.currentServicio = { ...servicio };
    this.isEditing = true;
  }

  resetForm(): void {
    this.currentServicio = { id: 0, titulo: '', descripcion: '', imagenUrl: '', activo: true, orden: 0 };
    this.isEditing = false;
    this.errorMessage = '';
  }
}
