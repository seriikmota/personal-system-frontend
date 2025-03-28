import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnamneseService {
  private apiUrl = 'http://localhost:8080/api/v1/anmnese';

  private _http = inject(HttpClient);

  constructor() {}

  listarAnamneses(pageNumber: number, pageSize: number, sortData: any): Observable<any> {
    let params = new HttpParams()
      .set('page', pageNumber)
      .set('size', pageSize);

    if (sortData) {
      params = params.set('sort', `${sortData.sortParam},${sortData.sortDirection}`);
    }

    return this._http.get<any>(this.apiUrl, { params: params });
  }

  incluirAnamnese(anamnese: any): Observable<any> {
    return this._http.post<any>(this.apiUrl, anamnese);
  }

  excluirAnamnese(id: number): Observable<any> {
    return this._http.delete<any>(`${this.apiUrl}/${id}`);
  }

  editarAnamnese(id: number, anamnese: any): Observable<any> {
    return this._http.put<any>(`${this.apiUrl}/${id}`, anamnese);
  }

  obterAnamnesePorId(id: number): Observable<any> {
    return this._http.get<any>(`${this.apiUrl}/${id}`);
  }

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

    return this._http.get<any>(`${this.apiUrl}/search`, { params });
  }
}
