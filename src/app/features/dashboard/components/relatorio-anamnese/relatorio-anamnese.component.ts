import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-relatorio-anamnese',
  imports: [
    CommonModule,
    MatCardModule,
    NgxChartsModule
  ],
  templateUrl: './relatorio-anamnese.component.html',
  styleUrl: './relatorio-anamnese.component.scss'
})
export class RelatorioAnamneseComponent implements OnInit {
  clientesComSemAnamnese: any[] = [];
  crescimentoClientesAnamnese: any[] = [];

  colorScheme = 'forest';

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getClientesComSemAnamnese().subscribe(data => {
      this.clientesComSemAnamnese = [
        { name: 'Com Anamnese', value: data.clientsWithAnamnese },
        { name: 'Sem Anamnese', value: data.clientsWithoutAnamnese }
      ];
    });

    this.dashboardService.getCrescimentoClientesAnamnese().subscribe(data => {
      this.crescimentoClientesAnamnese = this.transformData(data);
    });
  }

  transformData(data: any[]): any[] {
    return [
      {
        name: 'Clientes',
        series: data.map(item => ({
          name: item.date,
          value: item.clientCount
        }))
      }
    ];
  }
}
