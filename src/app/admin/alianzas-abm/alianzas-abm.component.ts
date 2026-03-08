import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlianzasService } from '../../core/services/alianzas.service';
import { Alianza } from '../../core/models/alianza.model';

@Component({
  selector: 'app-alianzas-abm',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alianzas-abm.component.html',
  styleUrls: ['./alianzas-abm.component.css']
})
export class AlianzasABMComponent implements OnInit {
  alianzas: Alianza[] = [];
  currentAlianza: any = { nombre: '', logoUrl: '', urlSitio: '', activo: true };
  isEditing = false;
  isLoading = false;
  errorMessage = '';

  constructor(private alianzasService: AlianzasService) {}

  ngOnInit(): void {
    this.loadAlianzas();
  }

  loadAlianzas(): void {
    this.isLoading = true;
    this.alianzasService.getAll().subscribe({
      next: (data) => {
        this.alianzas = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading alianzas', err);
        this.errorMessage = 'Error al cargar las alianzas.';
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.isEditing && this.currentAlianza.id) {
      this.updateAlianza();
    } else {
      this.createAlianza();
    }
  }

  createAlianza(): void {
    this.alianzasService.create(this.currentAlianza).subscribe({
      next: (newAlianza) => {
        this.alianzas.push(newAlianza);
        this.resetForm();
      },
      error: (err) => {
        console.error('Error creating alianza', err);
        this.errorMessage = 'Error al crear la alianza.';
      }
    });
  }

  updateAlianza(): void {
    if (!this.currentAlianza.id) return;
    this.alianzasService.update(this.currentAlianza.id, this.currentAlianza).subscribe({
      next: (updatedAlianza) => {
        const index = this.alianzas.findIndex(a => a.id === updatedAlianza.id);
        if (index !== -1) {
          this.alianzas[index] = updatedAlianza;
        }
        this.resetForm();
      },
      error: (err) => {
        console.error('Error updating alianza', err);
        this.errorMessage = 'Error al actualizar la alianza.';
      }
    });
  }

  deleteAlianza(id: number | undefined): void {
    if (!id) return;
    if (confirm('¿Estás seguro de que quieres eliminar esta alianza?')) {
      this.alianzasService.delete(id).subscribe({
        next: () => {
          this.alianzas = this.alianzas.filter(a => a.id !== id);
        },
        error: (err) => {
          console.error('Error deleting alianza', err);
          this.errorMessage = 'Error al eliminar la alianza.';
        }
      });
    }
  }

  editAlianza(alianza: Alianza): void {
    this.currentAlianza = { ...alianza };
    this.isEditing = true;
  }

  resetForm(): void {
    this.currentAlianza = { nombre: '', logoUrl: '', urlSitio: '', activo: true };
    this.isEditing = false;
    this.errorMessage = '';
  }
}
