import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Noticia } from '../models/noticia.model';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  private baseUrl = '/api/noticias';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(this.baseUrl);
  }

  getById(id: number): Observable<Noticia> {
    return this.http.get<Noticia>(`${this.baseUrl}/${id}`);
  }

  create(noticia: Noticia): Observable<Noticia> {
    return this.http.post<Noticia>(this.baseUrl, noticia);
  }

  update(id: number, noticia: Noticia): Observable<Noticia> {
    return this.http.put<Noticia>(`${this.baseUrl}/${id}`, noticia);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
