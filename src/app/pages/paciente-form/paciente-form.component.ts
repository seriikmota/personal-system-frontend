import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {MatStep, MatStepLabel, MatStepper, MatStepperPrevious} from '@angular/material/stepper';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

@Component({
    selector: 'app-paciente-form',
    imports: [
        ReactiveFormsModule,
        MatDialogContent,
        MatDialogTitle,
        MatDialogActions,
        MatButton,
        MatDialogClose,
        MatStep,
        MatFormField,
        MatStepper,
        MatInput,
        MatStepLabel,
        MatStepperPrevious,
        MatLabel
    ],
    providers: [{
            provide: STEPPER_GLOBAL_OPTIONS,
            useValue: { showError: true }
        }],
    templateUrl: './paciente-form.component.html',
    styleUrl: './paciente-form.component.scss'
})
export class PacienteFormComponent {

  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
  });
  secondFormGroup = this._formBuilder.group({
  });

}
