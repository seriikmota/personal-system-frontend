import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-mensageiro-status',
  imports: [MatCardModule, MatButtonModule, NgIf],
  templateUrl: './mensageiro-status.component.html',
  styleUrl: './mensageiro-status.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MensageiroStatusComponent {
  isValid: any = 'c';
}
