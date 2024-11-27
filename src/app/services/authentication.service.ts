import {inject, Injectable} from '@angular/core';
import {AuthDto} from '../models/auth-dto';
import {catchError, Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {CredencialDto} from '../models/credencial-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _rootUrl: string = '';

  LoginPath: string = 'http://localhost:8080/api/v1/auth/login';
  RefreshPath: string = 'http://localhost:8080/api/v1/auth/refresh';
  LogoutPath: string = 'http://localhost:8080/api/v1/auth/logout';

  private http = inject(HttpClient);

  get rootUrl(): string {
    return this._rootUrl;
  }
  set rootUrl(rootUrl: string) {
    this._rootUrl = rootUrl;
  }

  login(authDto: AuthDto): Observable<CredencialDto> {
    return this.http.post<CredencialDto>(this.LoginPath, authDto).pipe(catchError(this.handleError))
  }

  refresh(refreshToken: string): Observable<CredencialDto> {
    let params = new HttpParams()
      .set('refreshToken', refreshToken);

    return this.http.get<CredencialDto>(this.RefreshPath, {
      params: params
    }).pipe(catchError(this.handleError));
  }

  logout(token: string): Observable<any> {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.get<any>(this.LogoutPath,{
      headers: headers,
    }).pipe(catchError(this.handleError));
  }

  protected handleError(error: any): Observable<never> {
    return throwError(() => new Error(error.error));
  }
}
