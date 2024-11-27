import {Component, inject, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {provideNativeDateAdapter} from '@angular/material/core';
import {AuthenticationService} from '../../../services/authentication.service';
import {CredencialDto} from '../../../models/credencial-dto';
import {User} from '../../../models/user';

@Component({
  selector: 'app-login-form',
  imports: [
    MatCard,
    MatCardContent,
    ReactiveFormsModule,
    MatCardHeader,
    NgOptimizedImage,
    MatCardTitle,
    MatFormField,
    MatFormFieldModule,
    MatInput,
    MatButton,
    MatLabel,
    NgIf
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true }
    },
    [provideNativeDateAdapter()],
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit{

  loginForm!: FormGroup;
  private _formBuilder = inject(FormBuilder);
  private _authenticationService = inject(AuthenticationService);
  private _securityService = inject(SecurityService);

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      login: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      senha: [null, Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this._authenticationService.login(this.loginForm.value).subscribe((data: CredencialDto) => {
        const user: User = {
          id: data.id,
          name: data.name,
          login: data.login,
          expiresIn: data.expiresIn,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        };
        this.securityService.init(user);
      });
    }
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  };
}
