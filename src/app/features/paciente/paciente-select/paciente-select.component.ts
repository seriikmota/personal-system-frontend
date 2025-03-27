import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {PacienteService} from '../paciente.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-paciente-select',
  imports: [MatTableModule, MatCheckbox, MatDialogModule, MatPaginator, MatButton, MatSort, MatSortHeader],
  templateUrl: './paciente-select.component.html',
  standalone: true,
  styleUrl: './paciente-select.component.scss'
})
export class PacienteSelectComponent implements AfterViewInit {
  pacientes: any[] = [];
  dataSource: MatTableDataSource<any>;
  selectedPacientes: any[] = [];
  displayedColumns: string[] = ['nome', 'telefone'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private pacienteService: PacienteService,
              public dialogRef: MatDialogRef<PacienteSelectComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.listPacientes();
  }

  toggleSelection(paciente: any) {
    const index = this.selectedPacientes.indexOf(paciente);
    if (index === -1) {
      this.selectedPacientes.push(paciente);
    } else {
      this.selectedPacientes.splice(index, 1);
    }
  }

  confirmSelection() {
    this.dialogRef.close(this.selectedPacientes);
  }

  close() {
    this.dialogRef.close();
  }

  listPacientes() {
    console.log(this.paginator.pageIndex)
    const pageIndex = this.paginator.pageIndex != 0 ? this.paginator.pageIndex : 1;
    const pageSize = this.paginator.pageSize;
    const sortData = this.sort.active ? {sortParam: this.sort.active, sortDirection: this.sort.direction} : null;
    this.pacienteService.listarPacientes(pageIndex, pageSize, sortData).subscribe(response => {
      this.dataSource.data = response.content;
      this.paginator.length = response.totalElements;
      this.pacientes = response.content;
      console.log(response)
    });
  }
}
