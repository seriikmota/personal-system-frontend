import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import {DatePipe, DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-anamnese-details',
  standalone: true,
  imports: [
    MatButton,
    DatePipe,
    MatDialogClose,
    DecimalPipe
  ],
  templateUrl: './anamnese-details.component.html',
  styleUrls: ['./anamnese-details.component.scss']
})
export class AnamneseDetailsComponent {
  constructor(
    public dialogRef: MatDialogRef<AnamneseDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
