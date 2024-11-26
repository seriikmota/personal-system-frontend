import { Routes } from '@angular/router';
import { PacienteListComponent } from './features/paciente/paciente-list/paciente-list.component';
import {LoginFormComponent} from './features/login/login-form/login-form.component';
export const routes: Routes = [
  {path:'login', component: LoginFormComponent},
  {path:'pacienteList', component: PacienteListComponent},
];
