import {AfterViewInit, Component, inject, ViewChild} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { MatFabButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {PacienteFormComponent} from '../paciente-form/paciente-form.component';
import {PacienteService} from '../paciente.service';
import {ConfirmDialogComponent} from '../../../sharedpages/confirm-dialog/confirm-dialog.component';
import {PhoneFormatPipe} from '../../../sharedpages/phone-format.pipe';
import {CpfFormatPipe} from '../../../sharedpages/cpf-format.pipe';

@Component({
    selector: 'app-paciente-list',
    templateUrl: 'paciente-list.component.html',
    styleUrls: ['paciente-list.component.scss'],
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatIconButton, MatIcon, MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatPaginator, MatRow, MatRowDef, MatSort, MatSortHeader, MatTable, MatHeaderCellDef, MatFabButton, PhoneFormatPipe, CpfFormatPipe]
})
export class PacienteListComponent implements AfterViewInit{
  readonly _dialog = inject(MatDialog);
  private _pacienteService = inject(PacienteService);
  searchName: any;
  searchCpf: any;
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['name', 'cpf', 'email', 'phoneNumber', 'enabled', 'actions'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.listarPacientes();
  }

  listarPacientes() {
    const pageIndex = this.paginator.pageIndex;
    const pageSize = this.paginator.pageSize;
    this._pacienteService.listarPacientes(pageIndex, pageSize).subscribe(response => {
      this.dataSource.data = response.content;
      this.paginator.length = response.totalElements;
    });


  }

  incluirPaciente() {
    const dialogRef = this._dialog.open(PacienteFormComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '75%',
      width: '80%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.listarPacientes();
    });
  }

  clicarBotaoEditar(pacienteId: number) {
    this._pacienteService.obterPacientePorId(pacienteId).subscribe(paciente => {
      const dialogRef = this._dialog.open(PacienteFormComponent, {
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '75%',
        width: '80%',
        data: paciente
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        this.listarPacientes();
      });
    });
  }

  excluirPaciente(pacienteId: number) {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {id: pacienteId}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._pacienteService.excluirPaciente(pacienteId).subscribe(() => {
          console.log('Paciente excluído com sucesso');
          this.listarPacientes();
        });
      }
    });
  }

  outrasAcoes() {

  }
}
