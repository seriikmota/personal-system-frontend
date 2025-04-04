export interface ClientesAtivosInativos {
  activeClients: number;
  inactiveClients: number;
}

export interface ClientePorMensalidade {
  subscriptionType: string;
  clientCount: number;
}

export interface ClientePorIdade {
  ageRange: string;
  clientCount: number;
}

export interface ClientePorSexo {
  maleClients: number;
  femaleClients: number;
  otherClients: number;
}
