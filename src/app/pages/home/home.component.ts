import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServiciosService } from '../../core/services/servicios.service';
import { NoticiasService } from '../../core/services/noticias.service';
import { InformesService } from '../../core/services/informes.service';
import { AlianzasService } from '../../core/services/alianzas.service';
import { Servicio } from '../../core/models/servicio.model';
import { Noticia } from '../../core/models/noticia.model';
import { Informe } from '../../core/models/informe.model';
import { Alianza } from '../../core/models/alianza.model';

interface Slide {
  image: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  servicios: Servicio[] = [];
  noticias: Noticia[] = [];
  informes: Informe[] = [];
  alianzas: Alianza[] = [];

  // Slider properties
  currentSlide = 0;
  slides: Slide[] = [
    {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      title: 'ANÁLISIS DE DATOS',
      description: 'Transformamos números en estrategias claras para tu crecimiento.'
    },
    {
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      title: 'BIG DATA & AI',
      description: 'Tecnología avanzada para procesar grandes volúmenes de información.'
    },
    {
      image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      title: 'VISUALIZACIÓN DE DATOS',
      description: 'Dashboards interactivos que facilitan la toma de decisiones.'
    }
  ];
  private sliderInterval: any;

  constructor(
    private serviciosService: ServiciosService,
    private noticiasService: NoticiasService,
    private informesService: InformesService,
    private alianzasService: AlianzasService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.startSlider();
  }

  ngOnDestroy(): void {
    this.stopSlider();
  }

  startSlider(): void {
    this.sliderInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopSlider(): void {
    if (this.sliderInterval) {
      clearInterval(this.sliderInterval);
    }
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  setSlide(index: number): void {
    this.currentSlide = index;
    this.stopSlider();
    this.startSlider(); // Restart timer
  }

  loadData(): void {
    console.log('HomeComponent (Pages) - Loading data...');
    
    this.serviciosService.getAll().subscribe({
      next: (data) => {
        console.log('Servicios received:', data);
        this.servicios = Array.isArray(data) ? data.slice(0, 3) : [];
        console.log('Servicios set:', this.servicios.length);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading services:', err)
    });

    this.noticiasService.getAll().subscribe({
      next: (data) => {
        console.log('Noticias received:', data);
        this.noticias = Array.isArray(data) ? data.slice(0, 3) : [];
        console.log('Noticias set:', this.noticias.length);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading news:', err)
    });

    this.informesService.getAll().subscribe({
      next: (data) => {
        console.log('Informes received:', data);
        this.informes = Array.isArray(data) ? data.slice(0, 3) : [];
        console.log('Informes set:', this.informes.length);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading reports:', err)
    });

    this.alianzasService.getAll().subscribe({
      next: (data) => {
        console.log('Alianzas received:', data);
        this.alianzas = Array.isArray(data) ? data : [];
        console.log('Alianzas set:', this.alianzas.length);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading alliances:', err)
    });
  }
}
