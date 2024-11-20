import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
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
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });


  primeiraEtapaForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    cpf: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{11}$')]),
    dataNascimento: new FormControl('', Validators.required),
    sexo: new FormControl('', Validators.required),
    estadoCivil: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    telefone: new FormControl('', Validators.required),
    telefoneEmergencia: new FormControl('', Validators.required),
    profissao: new FormControl('', Validators.required),
  });

  segundaEtapaForm = new FormGroup({
    cep: new FormControl('', Validators.required),
    rua: new FormControl('', Validators.required),
    numero: new FormControl('', Validators.required),
    bairro: new FormControl('', Validators.required),
    cidade: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required),
    complemento: new FormControl(''),
  });
}
