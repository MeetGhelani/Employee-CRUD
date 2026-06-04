import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { EmployeeActionRenderer }
from '../employee-action-renderer/employee-action-renderer';

import { ToastService }
from '../../services/toast';


import {
  Component,
  OnInit,
  NgZone,
  ChangeDetectorRef,
  HostListener
} from '@angular/core';

import {
  ColDef,
  GridApi,
  GridReadyEvent,
  ModuleRegistry,
  AllCommunityModule
} from 'ag-grid-community';


import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee';

ModuleRegistry.registerModules([
  AllCommunityModule
]);

@Component({
  selector: 'app-employee-grid',
  standalone: true,
  imports: [
    CommonModule,
    AgGridAngular,
    FormsModule,
    EmployeeActionRenderer
  ],
  templateUrl: './employee-grid.html',
  styleUrl: './employee-grid.css'

  
})
export class EmployeeGrid implements OnInit {

  private gridApi!: GridApi;

  showDeleteModal = false;

  showExportMenu = false;

  @HostListener('document:click')
    closeDropdown() {

      this.showExportMenu = false;

    }

  displayedEmployeeCount = 0;

  employeeToDeleteId:
  number | null = null;

  searchText = '';
  rowData: Employee[] = [];

  overlayNoRowsTemplate = `
    <div
    style="
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    height:100%;
    color:#bdbdbd;
    font-size:16px;
    ">

    📭 No Employees Found

    <div
    style="
    margin-top:8px;
    font-size:13px;
    color:#888;">

    Try adjusting your search criteria

    </div>

    </div>
  `;

  defaultColDef: ColDef = {

    flex: 1,

    sortable: true,

    filter: true,

    resizable: true,

    minWidth: 120,

    maxWidth: 400,

  };
  
  columnDefs: ColDef[] = [

    {
      field: 'id',
      headerName: 'ID',
      maxWidth: 100
    },

    {
      field: 'name',
      headerName: 'Name'
    },

    {
      field: 'email',
      headerName: 'Email'
    },

    {
      field: 'department',
      headerName: 'Department'
    },

  {
    headerName: 'Actions',

    colId: 'actions',

    width: 180,

    minWidth: 180,

    maxWidth: 180,

    sortable: false,

    filter: false,

    resizable: false,

    cellRenderer: EmployeeActionRenderer,

    cellRendererParams: {

      edit: (
        employee: Employee
      ) => this.editEmployee(employee),

      delete: (
        id: number
      ) => this.openDeleteModal(id)

    }

  }

  ];

  constructor(

    private employeeService: EmployeeService,

    private cdr: ChangeDetectorRef,

    private ngZone: NgZone,

    private toastService: ToastService

  ) {}

 ngOnInit(): void {

    this.loadEmployees();

    this.employeeService
      .employeeUpdated$
      .subscribe(() => {

        this.loadEmployees();

      });

  }

  updateEmployeeCount() {

    if (!this.gridApi) {

      this.displayedEmployeeCount =
        this.rowData.length;

      return;

    }

    const displayedRows =
      this.gridApi.getDisplayedRowCount();

    this.displayedEmployeeCount =
      displayedRows > 0
        ? displayedRows
        : this.rowData.length;

  }

  toggleExportMenu() {

    this.showExportMenu =
      !this.showExportMenu;

  }
  exportCsv() {

    if (!this.gridApi) {

      return;

    }

    this.gridApi.exportDataAsCsv({

      fileName: 'employees.csv',

      columnKeys: [

        'id',
        'name',
        'email',
        'department'

      ]

    });

    this.showExportMenu = false;

    this.toastService.show(

      '✓ CSV file downloaded successfully',

      'success'

    );

  }

  exportExcel() {

    this.showExportMenu = false;

    this.toastService.show(

      '📊 Excel export feature coming soon',

      'info'

    );

  }

  loadEmployees() {

    this.employeeService
      .getEmployees()
      .subscribe({

       next: (data) => {

        this.rowData = [...data];

        this.displayedEmployeeCount = data.length;
          setTimeout(() => {

          this.updateEmployeeCount();

          },0);

        if (this.gridApi) {

          this.gridApi.setGridOption(
            'rowData',
            this.rowData
          );

          this.updateEmployeeCount();

          if (this.rowData.length === 0) {

            this.gridApi.showNoRowsOverlay();

          }
          else {

            this.gridApi.hideOverlay();

          }

        }

      },

        error: (error) => {

          console.error(
            'Error Loading Employees:',
            error
          );

        }

      });

  }
  onGridReady(event: GridReadyEvent) {

    this.gridApi = event.api;

    setTimeout(() => {

      this.gridApi.sizeColumnsToFit();

      this.updateEmployeeCount();

    }, 200);

  }

  onGridSizeChanged() {

    if (this.gridApi) {

      this.gridApi.sizeColumnsToFit();

    }

  }

  onQuickFilter() {

    if (!this.gridApi) {

      return;

    }

    this.gridApi.setGridOption(
      'quickFilterText',
      this.searchText
    );

    setTimeout(() => {

      this.updateEmployeeCount();

      const displayedRows =
        this.gridApi.getDisplayedRowCount();

      if (displayedRows === 0) {

        this.gridApi.showNoRowsOverlay();

      }
      else {

        this.gridApi.hideOverlay();

      }

    });

  }
  clearSearch() {

    this.searchText = '';

    if (!this.gridApi) {

      return;

    }

    this.gridApi.setGridOption(
      'quickFilterText',
      ''
    );

    this.gridApi.hideOverlay();

    this.updateEmployeeCount();

  }

  editEmployee(employee: Employee) {

    this.ngZone.run(() => {

      this.employeeService
        .selectedEmployee
        .set(employee);

    });

  }

  openDeleteModal(id: number) {

    this.ngZone.run(() => {

      this.employeeToDeleteId = id;

      this.showDeleteModal = true;

    });

  } 

  confirmDelete() {

    if (
      this.employeeToDeleteId === null
    ) {

      return;

    }

    const employeeId =
      this.employeeToDeleteId;

    this.employeeService
      .deleteEmployee(employeeId)
      .subscribe({

        next: () => {

          this.ngZone.run(() => {

            const selectedEmployee =
              this.employeeService
                .selectedEmployee();

            if (
              selectedEmployee &&
              selectedEmployee.id === employeeId
            ) {

              this.employeeService
                .selectedEmployee
                .set(null);

            }

            this.cancelDelete();

            this.cdr.detectChanges();

            this.employeeService
              .notifyEmployeeUpdated();

            this.toastService.show(

              '✓ Employee deleted successfully',

              'success'

            );

          });

        },

        error: (error) => {

          console.error(
            'Delete failed:',
            error
          );

        }

      });

  }

 cancelDelete() {

    this.showDeleteModal = false;

    this.employeeToDeleteId = null;

    this.cdr.detectChanges();

  }

  

}