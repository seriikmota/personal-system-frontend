import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ViaCep} from '../models/via-cep';
import {map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {

  apiUrl: string = 'https://viacep.com.br/ws/';

  constructor(private http: HttpClient) { }

  getEndereco(cep: string) {
    return this.http.get<ViaCep>(this.apiUrl + cep + '/json').pipe(
      map((response) => {
        return response;
      })
    )
  }
}
