import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InformesService } from '../../core/services/informes.service';
import { Informe } from '../../core/models/informe.model';

@Component({
  selector: 'app-informes-abm',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './informes-abm.component.html',
  styleUrls: ['./informes-abm.component.css']
})
export class InformesABMComponent implements OnInit {
  informes: Informe[] = [];
  currentInforme: any = { titulo: '', descripcion: '', archivoUrl: '', fechaPublicacion: new Date().toISOString().split('T')[0], activo: true };
  isEditing = false;
  isLoading = false;
  errorMessage = '';

  constructor(private informesService: InformesService) {}

  ngOnInit(): void {
    this.loadInformes();
  }

  loadInformes(): void {
    this.isLoading = true;
    this.informesService.getAll().subscribe({
      next: (data) => {
        this.informes = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading informes', err);
        this.errorMessage = 'Error al cargar los informes.';
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.isEditing && this.currentInforme.id) {
      this.updateInforme();
    } else {
      this.createInforme();
    }
  }

  createInforme(): void {
    this.informesService.create(this.currentInforme).subscribe({
      next: (newInforme) => {
        this.informes.push(newInforme);
        this.resetForm();
      },
      error: (err) => {
        console.error('Error creating informe', err);
        this.errorMessage = 'Error al crear el informe.';
      }
    });
  }

  updateInforme(): void {
    if (!this.currentInforme.id) return;
    this.informesService.update(this.currentInforme.id, this.currentInforme).subscribe({
      next: (updatedInforme) => {
        const index = this.informes.findIndex(i => i.id === updatedInforme.id);
        if (index !== -1) {
          this.informes[index] = updatedInforme;
        }
        this.resetForm();
      },
      error: (err) => {
        console.error('Error updating informe', err);
        this.errorMessage = 'Error al actualizar el informe.';
      }
    });
  }

  deleteInforme(id: number | undefined): void {
    if (!id) return;
    if (confirm('¿Estás seguro de que quieres eliminar este informe?')) {
      this.informesService.delete(id).subscribe({
        next: () => {
          this.informes = this.informes.filter(i => i.id !== id);
        },
        error: (err) => {
          console.error('Error deleting informe', err);
          this.errorMessage = 'Error al eliminar el informe.';
        }
      });
    }
  }

  editInforme(informe: Informe): void {
    this.currentInforme = { ...informe };
    if (this.currentInforme.fechaPublicacion) {
        this.currentInforme.fechaPublicacion = new Date(this.currentInforme.fechaPublicacion).toISOString().split('T')[0];
    }
    this.isEditing = true;
  }

  resetForm(): void {
    this.currentInforme = { titulo: '', descripcion: '', archivoUrl: '', fechaPublicacion: new Date().toISOString().split('T')[0], activo: true };
    this.isEditing = false;
    this.errorMessage = '';
  }
}
