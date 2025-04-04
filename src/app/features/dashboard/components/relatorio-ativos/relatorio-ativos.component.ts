import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-relatorio-ativos',
  imports: [
    CommonModule,
    MatCardModule,
    NgxChartsModule
  ],
  templateUrl: './relatorio-ativos.component.html',
  styleUrl: './relatorio-ativos.component.scss'
})
export class RelatorioAtivosComponent implements OnInit {
  clientesPorCidade: any[] = [];

  colorScheme = 'forest';

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getClientesPorCidade().subscribe(data => {
      this.clientesPorCidade = data.map((item: { city: any; clientCount: any; }) => ({
        name: item.city,
        value: item.clientCount
      }));
    }, error => {
      console.error('Erro ao carregar clientes por cidade:', error);
      this.clientesPorCidade = [];
    });
  }
}
