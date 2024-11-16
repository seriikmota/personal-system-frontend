import {Component} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-paciente-list',
  templateUrl: 'paciente-list.component.html',
  styleUrls: ['paciente-list.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButton, MatIconButton, MatIcon],
})
export class PacienteListComponent {
  searchName: any;
  searchCpf: any;

  clicarBotaoName() {
    console.log('Botão clicado: ', this.searchName);
  }
  clicarBotaoCpf() {
    console.log('Botão clicado: ', this.searchCpf);
  }
}
