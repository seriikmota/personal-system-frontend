import {inject, Injectable} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {AuthDto} from '../models/auth-dto';
import {Observable} from 'rxjs';
import {CredencialDto} from '../models/credencial-dto';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _authenticationService = inject(AuthenticationService);

  public login(authDto: AuthDto): Observable<CredencialDto> {
    return this._authenticationService.login(authDto);
  }

  public refresh(refreshToken: string): Observable<any> {
    return this._authenticationService.refresh(refreshToken);
  }
}
