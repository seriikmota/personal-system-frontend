import { Routes } from '@angular/router';
import { PacienteListComponent } from './features/paciente/paciente-list/paciente-list.component';
import {LoginFormComponent} from './features/login/login-form/login-form.component';
import {AppComponent} from './app.component';
import {SecurityGuard} from './authentication/security/security.guard';
import { AnamneseListComponent } from './features/anamnese/anamnese-list/anamnese-list.component';
import { AnamneseFormComponent } from './features/anamnese/anamnese-form/anamnese-form.component';
import { AnamneseDetailsComponent } from './features/anamnese/anamnese-details/anamnese-details.component';
import {MensageiroComponent} from './features/mensageiro/mensageiro/mensageiro.component';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'home', component: AppComponent},
  {path: 'login', component: LoginFormComponent},
  {path: 'pacienteList', component: PacienteListComponent, canActivate: [SecurityGuard], data: {security: {roles: ['ROLE_PATIENT_LISTALL']}}},
  {
    path: 'anamnese',
    children: [
      { path: '', component: AnamneseListComponent },        // Lista
      { path: 'create', component: AnamneseFormComponent },  // Criação
      { path: ':id', component: AnamneseDetailsComponent },  // Detalhes
      { path: 'edit/:id', component: AnamneseFormComponent } // Edição
    ]
  },
  {path: 'mensageiro', component: MensageiroComponent},
];
