import { Component } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { ClientePorMensalidade } from '../../../../models/Reports';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-relatorio-faturamento',
  imports: [
        CommonModule,
        MatCardModule,
        MatDividerModule,
        NgxChartsModule
  ],
  templateUrl: './relatorio-faturamento.component.html',
  styleUrl: './relatorio-faturamento.component.scss',
})
export class RelatorioFaturamentoComponent {
  clientesPorMensalidade: any[] = [];

  colorScheme = 'forest';

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getClientesPorMensalidade().subscribe(
      (data: ClientePorMensalidade | null) => {
        this.clientesPorMensalidade = data
          ? [
              { name: 'Mensalidade', value: data.subscriptionType || 0 },
              { name: 'Quantidade', value: data.clientCount || 0 },
            ]
          : [];
      },
      (error) => {
        console.error('Erro ao carregar clientes por mensalidade:', error);
        this.clientesPorMensalidade = [];
      }
    );
  }
}
