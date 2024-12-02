import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  //private apiUrl = 'http://localhost:8080/api/v1/patient';
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

  editarPaciente(id: number, paciente: any): Observable<any> {
    return this._http.put<any>(this.apiUrl, paciente);
  }

  obterPacientePorId(id: number): Observable<any> {
    return this._http.get<any>(`${this.apiUrl}/${id}`);
  }

  pesquisarPorNome(nome: string): Observable<any> {
    return this._http.get<any>(`${this.apiUrl}/search?name=${nome}`);
  }

  pesquisarPorCpf(cpf: string): Observable<any> {
    return this._http.get<any>(`${this.apiUrl}/search?cpf=${cpf}`);
  }
}
