import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../../dashboard.service';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {
  ClientesAtivosInativos,
  ClientePorMensalidade,
  ClientePorIdade,
  ClientePorSexo
} from '../../../../models/Reports';

@Component({
  selector: 'app-relatorio-clientes',
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    NgxChartsModule
  ],
  templateUrl: './relatorio-clientes.component.html',
  styleUrl: './relatorio-clientes.component.scss'
})
export class RelatorioClientesComponent implements OnInit {
  clientesAtivosInativos: any[] = [];
  clientesPorSexo: any[] = [];
  clientesPorIdade: any[] = [];

  colorScheme = 'forest';

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit(): void {
    this.dashboardService.getClientesAtivosInativos().subscribe((data: ClientesAtivosInativos | null) => {
      this.clientesAtivosInativos = data
        ? [
            { name: 'Ativos', value: data.activeClients || 0 },
            { name: 'Inativos', value: data.inactiveClients || 0 }
          ]
        : [];
    }, error => {
      console.error('Erro ao carregar clientes ativos e inativos:', error);
      this.clientesAtivosInativos = [];
    });

    this.dashboardService.getClientesPorSexo().subscribe((data: ClientePorSexo | null) => {
      this.clientesPorSexo = data
        ? [
            { name: 'Masculino', value: data.maleClients || 0 },
            { name: 'Feminino', value: data.femaleClients || 0 },
            { name: 'Outros', value: data.otherClients || 0 }
          ]
        : [];
    }, error => {
      console.error('Erro ao carregar clientes por sexo:', error);
      this.clientesPorSexo = [];
    });

    this.dashboardService.getClientesPorIdade().subscribe((data: ClientePorIdade[] | null) => {
      this.clientesPorIdade = data
        ? data.map(item => ({
            name: item.age || 'Desconhecido',
            value: item.clientCount || 0
          }))
        : [];
      console.log(this.clientesPorIdade);
    }, error => {
      this.clientesPorIdade = [];
    });

  }
}
