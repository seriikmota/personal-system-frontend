import {Component, Inject, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
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
import {ViaCepService} from '../../../services/via-cep.service';
import {MatProgressBar} from '@angular/material/progress-bar';
import {NgIf} from '@angular/common';
import {PacienteService} from '../paciente.service';

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
    MatStepperNext,
    MatProgressBar,
    NgIf
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
  thirdFormGroup!: FormGroup;
  isLoading: boolean = false;

  private _viaCepService = inject(ViaCepService);
  private _formBuilder = inject(FormBuilder);
  private _pacienteService = inject(PacienteService);
  private _dialogRef = inject(MatDialogRef<PacienteFormComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}


  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      name: [this.data?.name || '', [Validators.required]],
      cpf: [this.data?.cpf || '', [Validators.required]],
      birthDate: [this.data?.birthDate || '', [Validators.required]],
      gender: [this.data?.gender || '', [Validators.required]],
      maritalStatus: [this.data?.maritalStatus || '', [Validators.required]],
      email: [this.data?.email || '', [Validators.required]],
      profession: [this.data?.profession || '', [Validators.required]],
      phoneNumber: [this.data?.phoneNumber || '', [Validators.required]],
      emergencyNumber: [this.data?.emergencyNumber || '', [Validators.required]],
    });
    this.secondFormGroup = this._formBuilder.group({
      cep: [this.data?.cep || '', [Validators.required]],
      street: [this.data?.street || '', [Validators.required]],
      neighborhood: [this.data?.neighborhood || '', [Validators.required]],
      city: [this.data?.city || '', [Validators.required]],
      state: [this.data?.state || '', [Validators.required]],
      number: [this.data?.number || ''],
      complement: [this.data?.complement || ''],
    });
    this.thirdFormGroup = this._formBuilder.group({
      hasHealthPlan: [this.data?.hasHealthPlan || false, [Validators.required]],
      healthPlan: [this.data?.healthPlan || ''],
      enabled: [this.data?.active || true, [Validators.required]],
      valueForHour: [this.data?.valueForHour || '', [Validators.required]]
    });

    this.observePreenchimentoCep();
    this.observeHealthPlan();
  }

  observeHealthPlan() {
    this.thirdFormGroup.get('hasHealthPlan')?.valueChanges.subscribe(value => {
      if (!value) {
        this.thirdFormGroup.get('healthPlan')?.setValue('Não possui');
      } else {
        this.thirdFormGroup.get('healthPlan')?.setValue('');
      }
    });
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
    this.isLoading = true;
    this._viaCepService.getEndereco(cep).subscribe({
      next: (response) => {
        this.secondFormGroup.patchValue({
          rua: response.logradouro,
          bairro: response.bairro,
          cidade: response.localidade,
          estado: response.uf
        });
        this.isLoading = false;
      },
      error: () => {
        console.log('Erro ao buscar CEP');
        this.isLoading = false;
      }
    });
  }

  incluirPaciente() {
    const address = {
      ...this.secondFormGroup.value
    }
    const paciente = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
      address
    };

    if (!paciente.hasHealthPlan) {
      delete paciente.healthPlan;
      delete paciente.hasHealthPlan;
    }

    this._pacienteService.incluirPaciente(paciente).subscribe({
      next: () => {
        console.log('Paciente criado com sucesso');
        this._dialogRef.close(true);
      },
      error: (err) => {
        console.error('Erro ao criar paciente', err);
      }
    });
  }

}
