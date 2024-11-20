import { Routes } from '@angular/router';
import { PacienteListComponent } from './pages/paciente-list/paciente-list.component';
import { DatepickerOverviewExampleComponent} from './datepicker-overview-example/datepicker-overview-example.component';

export const routes: Routes = [
  {path:'', component: PacienteListComponent},
  {path:'datepicker', component: DatepickerOverviewExampleComponent}
];
