import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {PacienteService} from '../paciente.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {MatCheckbox} from '@angular/material/checkbox';

@Component({
  selector: 'app-paciente-select',
  imports: [MatTableModule, MatCheckbox, MatSort, MatSortHeader],
  templateUrl: './paciente-select.component.html',
  standalone: true,
  styleUrl: './paciente-select.component.scss'
})
export class PacienteSelectComponent implements AfterViewInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['checkAll', 'name'];
  selectedPacientes: any[] = [];
  @Input() disabled: boolean = true;

  @ViewChild(MatSort) sort!: MatSort;
  @Output() selectedPacientesChange = new EventEmitter<any[]>();

  constructor(private pacienteService: PacienteService, private changeDetectorRef: ChangeDetectorRef) {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.listPacientes();
    this.changeDetectorRef.detectChanges();
  }

  toggleSelection(paciente: any) {
    const index = this.selectedPacientes.indexOf(paciente);
    if (index === -1) {
      this.selectedPacientes.push(paciente);
    } else {
      this.selectedPacientes.splice(index, 1);
    }
    this.selectedPacientesChange.emit(this.selectedPacientes);
  }

  listPacientes() {
    const sortData = this.sort.active ? {sortParam: this.sort.active, sortDirection: this.sort.direction} : null;
    this.pacienteService.listarPacientes(0, 100, sortData).subscribe(response => {
      this.dataSource.data = response.content;
    });
  }

  checkAll(checked: boolean) {
    if (checked) {
      this.selectedPacientes = this.dataSource.data;
    } else {
      this.selectedPacientes = [];
    }
    this.selectedPacientesChange.emit(this.selectedPacientes);
  }
}
