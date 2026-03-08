export interface Servicio {
  id: number;
  titulo: string;
  descripcion: string;
  imagenUrl: string;
  activo: boolean;
  orden: number;
}

export interface Noticia {
  id: number;
  titulo: string;
  contenido: string;
  imagenUrl: string;
  fechaPublicacion: string;
  activo: boolean;
  autor?: any; // Simplify for now
}

export interface Informe {
  id: number;
  titulo: string;
  descripcion: string;
  archivoUrl: string;
  fechaPublicacion: string;
  activo: boolean;
}

export interface Alianza {
  id: number;
  nombre: string;
  logoUrl: string;
  urlSitio: string;
  activo: boolean;
}

export interface MensajeContacto {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
}
