import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Informe } from '../models/informe.model';

@Injectable({
  providedIn: 'root'
})
export class InformesService {
  private baseUrl = '/api/informes';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Informe[]> {
    return this.http.get<Informe[]>(this.baseUrl);
  }

  getById(id: number): Observable<Informe> {
    return this.http.get<Informe>(`${this.baseUrl}/${id}`);
  }

  create(informe: Informe): Observable<Informe> {
    return this.http.post<Informe>(this.baseUrl, informe);
  }

  update(id: number, informe: Informe): Observable<Informe> {
    return this.http.put<Informe>(`${this.baseUrl}/${id}`, informe);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
