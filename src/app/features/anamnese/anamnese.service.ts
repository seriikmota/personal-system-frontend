import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnamneseService {
  // Ajuste conforme a rota do seu backend:
  // Se for '/api/v1/anmnese', troque aqui.
  private apiUrl = 'http://localhost:8080/api/v1/anmnese';

  private _http = inject(HttpClient);

  constructor() {}

  /**
   * Lista de Anamneses com paginação e ordenação
   * (similar ao listarPacientes do PacienteService).
   */
  listarAnamneses(pageNumber: number, pageSize: number, sortData: any): Observable<any> {
    let params = new HttpParams()
      .set('page', pageNumber)
      .set('size', pageSize);

    if (sortData) {
      params = params.set('sort', `${sortData.sortParam},${sortData.sortDirection}`);
    }

    return this._http.get<any>(this.apiUrl, { params: params });
  }

  /**
   * Cria/inclui uma nova Anamnese
   */
  incluirAnamnese(anamnese: any): Observable<any> {
    return this._http.post<any>(this.apiUrl, anamnese);
  }

  /**
   * Exclui uma Anamnese pelo ID
   */
  excluirAnamnese(id: number): Observable<any> {
    return this._http.delete<any>(`${this.apiUrl}/${id}`);
  }

  /**
   * Edita/atualiza uma Anamnese
   */
  editarAnamnese(id: number, anamnese: any): Observable<any> {
    return this._http.put<any>(`${this.apiUrl}/${id}`, anamnese);
  }

  /**
   * Obtém uma Anamnese específica pelo ID
   */
  obterAnamnesePorId(id: number): Observable<any> {
    return this._http.get<any>(`${this.apiUrl}/${id}`);
  }

  /**
   * Exemplo de método de pesquisa para Anamnese, caso seu back-end
   * tenha endpoints como GET /api/v1/anamnese/anamnese/search?patientId=...?startDate=...?endDate=...?
   * Ajuste conforme sua rota real.
   */
  pesquisarAnamneses(patientId?: number, startDate?: string, endDate?: string): Observable<any> {
    let params = new HttpParams();

    if (patientId != null) {
      params = params.set('patientId', patientId);
    }
    if (startDate) {
      params = params.set('startDate', startDate);
    }
    if (endDate) {
      params = params.set('endDate', endDate);
    }

    return this._http.get<any>(`${this.apiUrl}/anamnese/search`, { params });
  }
}
