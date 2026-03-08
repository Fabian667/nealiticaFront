import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoticiasService } from '../../core/services/noticias.service';
import { Noticia } from '../../core/models/noticia.model';

@Component({
  selector: 'app-noticias-abm',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './noticias-abm.component.html',
  styleUrls: ['./noticias-abm.component.css']
})
export class NoticiasABMComponent implements OnInit {
  noticias: Noticia[] = [];
  currentNoticia: any = { titulo: '', contenido: '', imagenUrl: '', fechaPublicacion: new Date().toISOString().split('T')[0], activo: true };
  isEditing = false;
  isLoading = false;
  errorMessage = '';

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(): void {
    this.loadNoticias();
  }

  loadNoticias(): void {
    this.isLoading = true;
    this.noticiasService.getAll().subscribe({
      next: (data) => {
        this.noticias = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading noticias', err);
        this.errorMessage = 'Error al cargar las noticias.';
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    // Ensure date is properly formatted if needed by backend, usually ISO string is fine
    if (this.isEditing && this.currentNoticia.id) {
      this.updateNoticia();
    } else {
      this.createNoticia();
    }
  }

  createNoticia(): void {
    this.noticiasService.create(this.currentNoticia).subscribe({
      next: (newNoticia) => {
        this.noticias.push(newNoticia);
        this.resetForm();
      },
      error: (err) => {
        console.error('Error creating noticia', err);
        this.errorMessage = 'Error al crear la noticia.';
      }
    });
  }

  updateNoticia(): void {
    if (!this.currentNoticia.id) return;
    this.noticiasService.update(this.currentNoticia.id, this.currentNoticia).subscribe({
      next: (updatedNoticia) => {
        const index = this.noticias.findIndex(n => n.id === updatedNoticia.id);
        if (index !== -1) {
          this.noticias[index] = updatedNoticia;
        }
        this.resetForm();
      },
      error: (err) => {
        console.error('Error updating noticia', err);
        this.errorMessage = 'Error al actualizar la noticia.';
      }
    });
  }

  deleteNoticia(id: number | undefined): void {
    if (!id) return;
    if (confirm('¿Estás seguro de que quieres eliminar esta noticia?')) {
      this.noticiasService.delete(id).subscribe({
        next: () => {
          this.noticias = this.noticias.filter(n => n.id !== id);
        },
        error: (err) => {
          console.error('Error deleting noticia', err);
          this.errorMessage = 'Error al eliminar la noticia.';
        }
      });
    }
  }

  editNoticia(noticia: Noticia): void {
    this.currentNoticia = { ...noticia };
    // Format date for input type="date"
    if (this.currentNoticia.fechaPublicacion) {
        this.currentNoticia.fechaPublicacion = new Date(this.currentNoticia.fechaPublicacion).toISOString().split('T')[0];
    }
    this.isEditing = true;
  }

  resetForm(): void {
    this.currentNoticia = { titulo: '', contenido: '', imagenUrl: '', fechaPublicacion: new Date().toISOString().split('T')[0], activo: true };
    this.isEditing = false;
    this.errorMessage = '';
  }
}
