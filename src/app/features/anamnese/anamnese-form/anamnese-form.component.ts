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
import { NgIf } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';
import { AnamneseService } from '../anamnese.service';

@Component({
  selector: 'app-anamnese-form',
  standalone: true, // Se estiver usando Standalone Components
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

  // Armazena os FormGroups de cada step
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;

  // Injeção de dependências via new 'inject' (Angular 14+)
  private _formBuilder = inject(FormBuilder);
  private _anamneseService = inject(AnamneseService);
  private _dialogRef = inject(MatDialogRef<AnamneseFormComponent>);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any // Quando for edição, você pode receber o objeto da anamnese
  ) { }

  ngOnInit() {
    // Passo 1: informações principais
    this.firstFormGroup = this._formBuilder.group({
      patientId: [this.data?.patientId || '', [Validators.required]],
      anamnesisDate: [this.data?.anamnesisDate || '', [Validators.required]],
      mainComplaints: [this.data?.mainComplaints || '', [Validators.required]],
    });

    // Passo 2: histórico e observações
    this.secondFormGroup = this._formBuilder.group({
      medicalHistory: [this.data?.medicalHistory || '', [Validators.required]],
      observations: [this.data?.observations || '']
    });

    // Passo 3: medições corporais
    this.thirdFormGroup = this._formBuilder.group({
      weight: [this.data?.weight || null, [Validators.required]],
      height: [this.data?.height || null, [Validators.required]],
      waistCircumference: [this.data?.waistCircumference || null, [Validators.required]],
      hipCircumference: [this.data?.hipCircumference || null, [Validators.required]],
      bodyFatPercentage: [this.data?.bodyFatPercentage || null, [Validators.required]],
      muscleMass: [this.data?.muscleMass || null, [Validators.required]],
      bodyMassIndex: [this.data?.bodyMassIndex || null, [Validators.required]],
      waistHipRatio: [this.data?.waistHipRatio || null, [Validators.required]],
    });
  }

  /**
   * Método chamado no último passo do Stepper, para incluir ou atualizar a anamnese.
   */
  incluirAnamnese() {
    if (this.firstFormGroup.invalid || this.secondFormGroup.invalid || this.thirdFormGroup.invalid) {
      return; // Aqui você pode exibir alguma mensagem de erro ou só impedir que prossiga
    }

    // Combina os dados dos três passos em um único objeto
    const anamnese = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
      ...this.thirdFormGroup.value
    };

    // Verifica se é edição ou inclusão
    if (this.data?.id) {
      // Edição
      this._anamneseService.editarAnamnese(this.data.id, anamnese).subscribe({
        next: () => {
          console.log('Anamnese atualizada com sucesso');
          this._dialogRef.close(true); // Fecha o diálogo e informa sucesso
        },
        error: (err: unknown) => {
          console.error('Erro ao atualizar anamnese', err);
        }
      });
    } else {
      // Inclusão
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
  }
}
