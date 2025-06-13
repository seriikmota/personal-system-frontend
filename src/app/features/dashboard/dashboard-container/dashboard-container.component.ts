import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { RelatorioAnamneseComponent } from '../components/relatorio-anamnese/relatorio-anamnese.component';
import { RelatorioAniversariantesComponent } from '../components/relatorio-aniversariantes/relatorio-aniversariantes.component';
import { RelatorioAtivosComponent } from '../components/relatorio-ativos/relatorio-ativos.component';
import { RelatorioClientesComponent } from '../components/relatorio-clientes/relatorio-clientes.component';
import { RelatorioFaturamentoComponent } from '../components/relatorio-faturamento/relatorio-faturamento.component';
import { DashboardService } from '../dashboard.service';
import { HttpErrorResponse } from '@angular/common/http';

import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-dashboard-container',
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    RelatorioAnamneseComponent,
    RelatorioAniversariantesComponent,
    RelatorioAtivosComponent,
    RelatorioClientesComponent,
    RelatorioFaturamentoComponent
],
  templateUrl: './dashboard-container.component.html',
  styleUrl: './dashboard-container.component.scss'
})
export class DashboardContainerComponent {
  tabs = ['Clientes', 'Aniversariantes', 'Anamnese', 'Ativos'];

   constructor(private dashboardService: DashboardService) {
    }

  exportExcel(): void {
    this.dashboardService.exportarParaExcel().subscribe({
      next: (blob) => {
        const fileName = `Relatorio_${new Date().toLocaleDateString()}.xlsx`;
        FileSaver.saveAs(blob, fileName);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erro ao exportar o arquivo:', err);
      }
    });
  }
}
