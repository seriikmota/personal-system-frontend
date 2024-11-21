import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from '@angular/material/stepper';
import {MatFormField, MatFormFieldModule, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, MatOption, provideNativeDateAdapter} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {ViaCepService} from '../../services/via-cep.service';

@Component({
    selector: 'app-paciente-form',
  imports: [
    ReactiveFormsModule,
    MatDialogContent,
    MatDialogTitle,
    MatButton,
    MatDialogClose,
    MatStep,
    MatFormField,
    MatFormFieldModule,
    MatStepper,
    MatInput,
    MatStepLabel,
    MatStepperPrevious,
    MatLabel,
    MatDatepicker,
    MatDatepickerToggle,
    MatDatepickerInput,
    MatSuffix,
    MatSelect,
    MatOption,
    MatStepperNext
  ],
    providers: [
      {
        provide: STEPPER_GLOBAL_OPTIONS,
        useValue: { showError: true }
      },
      [provideNativeDateAdapter()],
      {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}
    ],
    templateUrl: './paciente-form.component.html',
    styleUrl: './paciente-form.component.scss'
})
export class PacienteFormComponent implements OnInit{

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  private _viaCepService = inject(ViaCepService);
  private _formBuilder = inject(FormBuilder);

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      nome: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      dataDeNascimento: [{value:'' , disabled: true}, [Validators.required]],
      sexo: ['', [Validators.required]],
      estadoCivil: ['', [Validators.required]],
      email: ['', [Validators.required]],
      profissao: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      contatoDeEmergencia: ['', [Validators.required]],
    });
    this.secondFormGroup = this._formBuilder.group({
      cep: ['', [Validators.required]],
      rua: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      complemento: ['', [Validators.required]],
    });

    this.observePreenchimentoCep()
  }

  observePreenchimentoCep() {
    this.secondFormGroup.get('cep')?.valueChanges.subscribe(value=> {
      if(value?.length == 8) {
        this.buscarCep();
      }
    })
  }

  buscarCep() {
    let cep = this.secondFormGroup.get('cep')?.value;
    this._viaCepService.getEndereco(cep).subscribe({
      next: (response) => {
        this.secondFormGroup.patchValue({
          rua: response.logradouro,
          bairro: response.bairro,
          cidade: response.localidade,
          estado: response.uf
        });
      },
      error: () => {
        console.log('Erro ao buscar CEP');
      }
    });
  }
}
