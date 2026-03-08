import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MensajeContacto } from '../models/mensaje-contacto.model';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  private baseUrl = '/api/contactos';

  constructor(private http: HttpClient) { }

  enviar(mensaje: MensajeContacto): Observable<any> {
    return this.http.post(this.baseUrl, mensaje);
  }

  getUnread(): Observable<MensajeContacto[]> {
    return this.http.get<MensajeContacto[]>(`${this.baseUrl}/admin/unread`);
  }

  getAll(): Observable<MensajeContacto[]> {
    return this.http.get<MensajeContacto[]>(`${this.baseUrl}/admin/all`);
  }

  markAsRead(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/admin/${id}/read`, {});
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/admin/${id}`);
  }
}
