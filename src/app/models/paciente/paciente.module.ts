import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class PacienteModule {
  private nome?: string;
  private cpf?: string;
  private dataNascimento?: string;
  private sexo?: string;
  private estadoCivil?: string;
  private email?: string;
  private telefone?: string;
  private telefoneEmergencia?: string;
  private profissao?: string;

  private cep?: string;
  private rua?: string;
  private numero?: string;
  private bairro?: string;
  private cidade?: string;
  private estado?: string;
  private complemento?: string;
}
