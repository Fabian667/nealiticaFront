import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servicio, Noticia, Informe, Alianza, MensajeContacto } from '../models/nealitica.models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = '/api';

  constructor(private http: HttpClient) { }

  getServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${this.baseUrl}/servicios`);
  }

  getNoticias(): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(`${this.baseUrl}/noticias`);
  }

  getInformes(): Observable<Informe[]> {
    return this.http.get<Informe[]>(`${this.baseUrl}/informes`);
  }

  getAlianzas(): Observable<Alianza[]> {
    return this.http.get<Alianza[]>(`${this.baseUrl}/alianzas`);
  }

  // Auth Methods
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/signin`, credentials);
  }

  // Create Methods (Admin)
  createServicio(servicio: any): Observable<Servicio> {
    return this.http.post<Servicio>(`${this.baseUrl}/servicios`, servicio);
  }

  createNoticia(noticia: any): Observable<Noticia> {
    return this.http.post<Noticia>(`${this.baseUrl}/noticias`, noticia);
  }

  createInforme(informe: any): Observable<Informe> {
    return this.http.post<Informe>(`${this.baseUrl}/informes`, informe);
  }

  createAlianza(alianza: any): Observable<Alianza> {
    return this.http.post<Alianza>(`${this.baseUrl}/alianzas`, alianza);
  }

  enviarContacto(mensaje: MensajeContacto): Observable<any> {
    return this.http.post(`${this.baseUrl}/contactos`, mensaje);
  }
}
