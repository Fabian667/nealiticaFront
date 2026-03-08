export interface Noticia {
  id: number;
  titulo: string;
  contenido: string;
  imagenUrl: string;
  fechaPublicacion: string;
  activo: boolean;
  autor?: any;
}
