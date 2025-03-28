import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious } from '@angular/material/stepper';
import { MatFormField, MatFormFieldModule, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatOption, provideNativeDateAdapter } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { NgIf, NgForOf } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';
import { AnamneseService } from '../anamnese.service';
import { PacienteService } from '../../paciente/paciente.service';

@Component({
  selector: 'app-anamnese-form',
  standalone: true,
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
    MatStepperNext,
    MatSelect,
    NgIf,
    NgxMaskDirective,
    MatOption,
    NgForOf
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true }
    },
    [provideNativeDateAdapter()],
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ],
  templateUrl: './anamnese-form.component.html',
  styleUrls: ['./anamnese-form.component.scss']
})
export class AnamneseFormComponent implements OnInit {
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  pacientes: any[] = [];

  private _formBuilder = inject(FormBuilder);
  private _anamneseService = inject(AnamneseService);
  private _pacienteService = inject(PacienteService);
  private _dialogRef = inject(MatDialogRef<AnamneseFormComponent>);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      patientId: [this.data?.patientId || '', [Validators.required]],
      anamnesisDate: [this.data?.anamnesisDate || '', [Validators.required]],
      mainComplaints: [this.data?.mainComplaints || '', [Validators.required]],
      medicalHistory: [this.data?.medicalHistory || '', [Validators.required]],
      observations: [this.data?.observations || '']
    });

    this.secondFormGroup = this._formBuilder.group({
      weight: [this.data?.weight || null, [Validators.required]],
      height: [this.data?.height || null, [Validators.required]],
      waistCircumference: [this.data?.waistCircumference || null, [Validators.required]],
      hipCircumference: [this.data?.hipCircumference || null, [Validators.required]],
      bodyFatPercentage: [this.data?.bodyFatPercentage || null, [Validators.required]],
      muscleMass: [this.data?.muscleMass || null, [Validators.required]],
      waistHipRatio: [this.data?.waistHipRatio || null, [Validators.required]],
    });

    this.carregarPacientes();
  }

  carregarPacientes() {
    this._pacienteService.listarPacientes(0, 100, null).subscribe({
      next: (response) => {
        this.pacientes = response.content;
      },
      error: (err) => {
        console.error('Erro ao carregar pacientes', err);
      }
    });
  }

  incluirAnamnese() {
    if (this.firstFormGroup.invalid || this.secondFormGroup.invalid) {
      return;
    }

    const patientId = this.firstFormGroup.value.patientId;

    this._pacienteService.obterPacientePorId(patientId).subscribe({
      next: (patient) => {
        const anamnese = {
          patient: patient,
          ...this.firstFormGroup.value,
          ...this.secondFormGroup.value
        };

        if (this.data?.id) {
          this._anamneseService.editarAnamnese(this.data.id, anamnese).subscribe({
            next: () => {
              console.log('Anamnese atualizada com sucesso');
              this._dialogRef.close(true);
            },
            error: (err: unknown) => {
              console.error('Erro ao atualizar anamnese', err);
            }
          });
        } else {
          this._anamneseService.incluirAnamnese(anamnese).subscribe({
            next: () => {
              console.log('Anamnese criada com sucesso');
              this._dialogRef.close(true);
            },
            error: (err: unknown) => {
              console.error('Erro ao criar anamnese', err);
            }
          });
        }
      },
      error: (err) => {
        console.error('Erro ao obter dados do paciente', err);
      }
    });
  }
}
