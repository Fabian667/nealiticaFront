import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servicio } from '../models/servicio.model';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  private baseUrl = '/api/servicios';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.baseUrl);
  }

  getAllAdmin(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${this.baseUrl}/admin/all`);
  }

  getById(id: number): Observable<Servicio> {
    return this.http.get<Servicio>(`${this.baseUrl}/${id}`);
  }

  create(servicio: Servicio): Observable<Servicio> {
    return this.http.post<Servicio>(this.baseUrl, servicio);
  }

  update(id: number, servicio: Servicio): Observable<Servicio> {
    return this.http.put<Servicio>(`${this.baseUrl}/${id}`, servicio);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
