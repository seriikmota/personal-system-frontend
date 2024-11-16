import { Routes } from '@angular/router';
import { PacienteListComponent } from './pages/paciente-list/paciente-list.component';
import { TableSortingExample } from './table-sorting-example/table-sorting-example.component';

export const routes: Routes = [
  {path:'', component: PacienteListComponent},
  {path:'table', component: TableSortingExample}
];
