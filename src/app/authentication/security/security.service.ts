import {EventEmitter, Inject, inject, Injectable} from '@angular/core';
import {CredentialDTO} from '../../models/CredentialDTO';
import {config, IConfig} from './config';
import {Credential} from '../../models/Credential';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private _authService = inject(AuthService);
  private _notificationsService = inject(ToastrService);
  private _router = inject(Router);

  public onRefresh = new EventEmitter<string>;
  public onForbidden = new EventEmitter<Credential>;
  public onUnauthorized = new EventEmitter<Credential>;
  private _securityConfig: IConfig;
  private _credential: Credential;
  private _intervalId: any;

  constructor(@Inject(config) config: IConfig) {
    this._securityConfig = config;
    this._credential = new Credential(config);
    this.configureSecurityActions();
  }

  public init(user?: CredentialDTO): void {
    this.credential.init(user);

    if (user) {
      const expiresIn = (user.expiresIn - 10) * 1000;
      this._intervalId = setInterval(() => {
        clearInterval(this._intervalId);
        this.onRefresh.emit(this._credential.refreshToken);
      }, expiresIn);
    } else {
      if (this.isValid()) {
        this.onRefresh.emit(this._credential.refreshToken);
      }
    }
  }

  private configureSecurityActions() {
    this.onRefresh.subscribe((refreshToken: string) => {
      this._authService.refresh(refreshToken).subscribe({
        next: (credential: CredentialDTO) => {
          this.init(credential);
        }
      });
    });

    this.onForbidden.subscribe(() => {
      this._notificationsService.warning("Você não está autenticado!");
      this._router.navigate([this._securityConfig.loginRouter]);
    });

    this.onUnauthorized.subscribe(() => {
      this._notificationsService.warning("Você não tem permissão para acessar ou realiza está ação!");
      this._router.navigate(['home']);
    });
  }

  public hasRoles(roles: string | string[]): boolean {
    let valid = false;

    if (this.isValid() && roles && roles.length > 0) {
      const userRoles = this.credential.user?.roles;
      if (userRoles) {
        if (typeof roles === 'string') {
          valid = userRoles.filter((userRole: string) => {
            return userRole === roles;
          }).length !== 0;
        } else {
          for (let index = 0; index < roles.length; index++) {
            const role = roles[index];

            const count = userRoles.filter((userRole: string) => {
              return userRole === role;
            }).length;
            if (count > 0) {
              valid = true;
              break;
            }
          }
        }
      }
    }
    return valid;
  }

  public logout(): void {
    this._authService.logout(this._credential.accessToken).subscribe({
      next: () => {
        this.invalidate();
      }
    });
  }

  private invalidate(): void {
    this._credential.clean();
    clearInterval(this._intervalId);
    this.onUnauthorized.emit(this._credential);
  }

  public isValid(): boolean {
    return this._credential.user !== undefined;
  }

  public get credential(): Credential {
    return this._credential;
  }
}
