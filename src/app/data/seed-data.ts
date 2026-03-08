import { Servicio, Noticia, Informe, Alianza } from '../models/nealitica.models';

export const SEED_SERVICIOS: Partial<Servicio>[] = [
  {
    titulo: 'Investigación de Mercado',
    descripcion: 'Análisis profundo del comportamiento del consumidor y tendencias del mercado.',
    imagenUrl: '',
    activo: true,
    orden: 1
  },
  {
    titulo: 'Análisis de Datos',
    descripcion: 'Procesamiento y visualización de datos complejos para la toma de decisiones.',
    imagenUrl: '',
    activo: true,
    orden: 2
  },
  {
    titulo: 'Comunicación Estratégica',
    descripcion: 'Desarrollo de planes de comunicación efectivos alineados con tus objetivos.',
    imagenUrl: '',
    activo: true,
    orden: 3
  }
];

export const SEED_NOTICIAS: Partial<Noticia>[] = [
  {
    titulo: 'Lanzamiento de Nealitica',
    contenido: 'Estamos orgullosos de presentar nuestra nueva plataforma de servicios integrales. Nealitica nace con la misión de transformar datos en decisiones estratégicas.',
    imagenUrl: '',
    fechaPublicacion: new Date().toISOString(),
    activo: true
  }
];

export const SEED_INFORMES: Partial<Informe>[] = [
  {
    titulo: 'Informe Anual de Tendencias 2024',
    descripcion: 'Un análisis exhaustivo sobre las tendencias de consumo en la región.',
    archivoUrl: '#',
    fechaPublicacion: '2024-01-15',
    activo: true
  }
];

export const SEED_ALIANZAS: Partial<Alianza>[] = [
  // Puedes agregar alianzas aquí si tienes URLs reales
];
