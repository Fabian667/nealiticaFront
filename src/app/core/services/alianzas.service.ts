import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alianza } from '../models/alianza.model';

@Injectable({
  providedIn: 'root'
})
export class AlianzasService {
  private baseUrl = '/api/alianzas';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Alianza[]> {
    return this.http.get<Alianza[]>(this.baseUrl);
  }

  getById(id: number): Observable<Alianza> {
    return this.http.get<Alianza>(`${this.baseUrl}/${id}`);
  }

  create(alianza: Alianza): Observable<Alianza> {
    return this.http.post<Alianza>(this.baseUrl, alianza);
  }

  update(id: number, alianza: Alianza): Observable<Alianza> {
    return this.http.put<Alianza>(`${this.baseUrl}/${id}`, alianza);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
