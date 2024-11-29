import {inject, Injectable} from '@angular/core';
import {AuthDTO} from '../../models/AuthDTO';
import {Observable} from 'rxjs';
import {CredentialDTO} from '../../models/CredentialDTO';
import {AuthService} from '../../authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _authService = inject(AuthService);

  constructor() { }

  public login(authDto: AuthDTO): Observable<CredentialDTO> {
    return this._authService.login(authDto);
  }

  public refresh(refreshToken: string): Observable<CredentialDTO> {
    return this._authService.refresh(refreshToken);
  }
}
