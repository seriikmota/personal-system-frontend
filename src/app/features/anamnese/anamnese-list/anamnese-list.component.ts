import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatFabButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AnamneseFormComponent } from '../anamnese-form/anamnese-form.component';
import { AnamneseService } from '../anamnese.service';
import { ConfirmDialogComponent } from '../../../sharedpages/confirm-dialog/confirm-dialog.component';
import { AnamneseDetailsComponent } from '../anamnese-details/anamnese-details.component';
import {DatePipe, DecimalPipe, NgIf} from '@angular/common';
import {PacienteService} from '../../paciente/paciente.service';

@Component({
  selector: 'app-anamnese-list',
  templateUrl: './anamnese-list.component.html',
  styleUrls: ['./anamnese-list.component.scss'],
  standalone: true,
  imports: [
    // Módulos de Material necessários:
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconButton,
    MatIcon,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatSort,
    MatSortHeader,
    MatTable,
    MatHeaderCellDef,
    MatFabButton, NgIf, DecimalPipe, DatePipe,
  ]
})
export class AnamneseListComponent implements AfterViewInit {
  private readonly _dialog = inject(MatDialog);
  private readonly _anamneseService = inject(AnamneseService);
  private readonly _pacienteService = inject(PacienteService);


  searchDate: string = '';
  pacientesCount: number = 0;

  searchName: any;
  pageNumber: number = 0;
  pageSize: number = 10;
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['patientName', 'anamnesisDate', 'weight', 'bodyMassIndex', 'waistHipRatio', 'actions'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.listarAnamneses();
    this.carregarPacientes(); // Carregar pacientes ao inicializar
  }

  listarAnamneses() {
    // Parâmetros de paginação/ordenação
    const pageIndex = this.paginator.pageIndex;
    const pageSize = this.paginator.pageSize;
    const sortData = this.sort.active
      ? { sortParam: this.sort.active, sortDirection: this.sort.direction }
      : null;

    this._anamneseService.listarAnamneses(pageIndex, pageSize, sortData).subscribe({
      next: (response) => {
        this.dataSource.data = response.content;
        this.paginator.length = response.totalElements;
      },
      error: (err) => {
        console.error('Erro ao listar anamneses:', err);
      },
    });
  }

  carregarPacientes() {
    this._pacienteService.listarPacientes(0, 1, null).subscribe({
      next: (response) => {
        this.pacientesCount = response.totalElements;
      },
      error: (err) => {
        console.error('Erro ao carregar pacientes:', err);
      }
    });
  }

  incluirAnamnese() {
    const dialogRef = this._dialog.open(AnamneseFormComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '75%',
      width: '80%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listarAnamneses();
      }
    });
  }

  editarAnamnese(anamneseId: number) {
    this._anamneseService.obterAnamnesePorId(anamneseId).subscribe({
      next: (anamnese) => {
        const dialogRef = this._dialog.open(AnamneseFormComponent, {
          maxWidth: '100vw',
          maxHeight: '100vh',
          height: '75%',
          width: '80%',
          data: anamnese, // passando a anamnese para edição
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.listarAnamneses();
          }
        });
      },
      error: (err) => {
        console.error('Erro ao obter anamnese:', err);
      },
    });
  }

  excluirAnamnese(anamneseId: number) {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { title: 'Confirmar exclusão?', message: 'Tem certeza que deseja excluir esta anamnese?\nEsta ação é irreversível!' }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._anamneseService.excluirAnamnese(anamneseId).subscribe({
          next: () => {
            console.log('Anamnese excluída com sucesso');
            this.listarAnamneses();
          },
          error: (err) => {
            console.error('Erro ao excluir anamnese:', err);
          },
        });
      }
    });
  }

  outrasAcoes(anamneseId: number) {
    this._anamneseService.obterAnamnesePorId(anamneseId).subscribe({
      next: (anamnese) => {
        this._dialog.open(AnamneseDetailsComponent, { data: anamnese });
      },
      error: (err) => {
        console.error('Erro ao obter anamnese:', err);
      },
    });
  }

  pesquisarPorNome() {
    this._anamneseService.pesquisarPorNome(this.searchName).subscribe(response => {
      this.dataSource.data = response.content;
      this.paginator.length = response.totalElements;
    });
  }

  clearSearchName() {
    this.searchName = '';
    this.pesquisarPorNome();
  }


  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex;
    this.paginator.pageIndex = event.pageIndex;
    this.listarAnamneses();
  }
}
