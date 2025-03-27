// src/app/models/Anamnese.ts
export interface Anamnese {
  id?: number;
  patientId: number;          // Relacionamento com Paciente
  anamnesisDate: string;      // Data da anamnese
  mainComplaints: string;     // Principais queixas
  medicalHistory: string;     // Histórico médico
  observations?: string;      // Observações
  weight: number;
  height: number;
  waistCircumference: number;
  hipCircumference: number;
  bodyFatPercentage: number;
  muscleMass: number;
  bodyMassIndex: number;
  waistHipRatio: number;
}
