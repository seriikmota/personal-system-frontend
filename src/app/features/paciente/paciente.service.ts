import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private apiUrl = 'http://localhost:8080/api/v1/patient';

  private _http = inject(HttpClient);

  constructor() {}

  listarPacientes(page: number, size: number): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this._http.get<any>(this.apiUrl, { params });
  }

  incluirPaciente(paciente: any): Observable<any> {
    return this._http.post<any>(this.apiUrl, paciente);
  }

  excluirPaciente(id: number): Observable<any> {
    return this._http.delete<any>(`${this.apiUrl}/${id}`);
  }

  obterPacientePorId(id: number): Observable<any> {
    return this._http.get<any>(`${this.apiUrl}/${id}`);
  }
}
