import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Servicio, Noticia, Alianza, MensajeContacto, Informe } from '../../models/nealitica.models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  servicios: Servicio[] = [];
  noticias: Noticia[] = [];
  alianzas: Alianza[] = [];
  informes: Informe[] = [];
  
  // Estado del menú responsive
  isMenuOpen = false;

  contacto: MensajeContacto = {
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  };

  mensajeEnviado = false;
  errorEnvio = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  cargarDatos(): void {
    console.log('Iniciando carga de datos...');
    
    this.apiService.getServicios().subscribe({
      next: (data) => {
        console.log('Servicios recibidos:', data);
        this.servicios = data;
      },
      error: (err) => console.error('Error cargando servicios', err)
    });

    this.apiService.getNoticias().subscribe({
      next: (data) => {
        console.log('Noticias recibidas:', data);
        this.noticias = data;
      },
      error: (err) => console.error('Error cargando noticias', err)
    });

    this.apiService.getInformes().subscribe({
      next: (data) => {
        console.log('Informes recibidos:', data);
        this.informes = data;
      },
      error: (err) => console.error('Error cargando informes', err)
    });

    this.apiService.getAlianzas().subscribe({
      next: (data) => {
        console.log('Alianzas recibidas:', data);
        this.alianzas = data;
      },
      error: (err) => console.error('Error cargando alianzas', err)
    });
  }

  enviarContacto(): void {
    this.apiService.enviarContacto(this.contacto).subscribe({
      next: () => {
        this.mensajeEnviado = true;
        this.errorEnvio = false;
        this.contacto = { nombre: '', email: '', asunto: '', mensaje: '' };
        setTimeout(() => this.mensajeEnviado = false, 5000);
      },
      error: (err) => {
        console.error('Error enviando mensaje', err);
        this.errorEnvio = true;
      }
    });
  }

  scrollTo(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
