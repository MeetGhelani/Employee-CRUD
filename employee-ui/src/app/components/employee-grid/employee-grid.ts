import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { EmployeeActionRenderer }
from '../employee-action-renderer/employee-action-renderer';

import { ToastService }
from '../../services/toast';

import {
  Subject,
  debounceTime,
  distinctUntilChanged
} from 'rxjs';

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
  AllCommunityModule,
  SortChangedEvent
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

    currentPage = 1;

    pageSize = 10;

   pageSizeOptions = [

      10,
      25,
      50,
      100

    ];

    showPageSizeMenu = false;

    totalPages = 0;

  private searchSubject = new Subject<string>();

  private gridApi!: GridApi;

  showDeleteModal = false;

  showExportMenu = false;

  @HostListener('document:click')
  closeDropdown() {

    this.showExportMenu = false;

    this.showPageSizeMenu = false;

  }

  displayedEmployeeCount = 0;

  totalEmployeeCount = 0;

  employeeToDeleteId:
  number | null = null;

  searchText = '';

  currentSortField = '';

  currentSortOrder = '';

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
      field: 'departmentName',
      headerName: 'Department'
    },
    {
    field: 'designationName',
    headerName: 'Designation'
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

    this.searchSubject
      .pipe(

        debounceTime(400),

        distinctUntilChanged()

      )
      .subscribe(() => {

        this.currentPage = 1;

        this.loadEmployees();

      });

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

  togglePageSizeMenu() {

    this.showPageSizeMenu =
      !this.showPageSizeMenu;

  }

  changePageSize(
    size: number
  ) {

    if (
      this.pageSize === size
    ) {

      this.showPageSizeMenu = false;

      return;

    }

    this.pageSize = size;

    this.currentPage = 1;

    this.showPageSizeMenu = false;

    this.loadEmployees();

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
        'departmentName',
        'designationName'

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
      .getEmployees(
        this.searchText,
        this.currentSortField,
        this.currentSortOrder,
        this.currentPage,
        this.pageSize
      )
      .subscribe({

        next: (data) => {

          this.rowData =
            [...data.employees];

          this.totalEmployeeCount = data.totalCount;

          this.displayedEmployeeCount = this.rowData.length;

          this.totalPages =
            Math.ceil(
              data.totalCount /
              this.pageSize 
            );

          this.cdr.detectChanges(); 

          if (this.gridApi) {

            this.gridApi.setGridOption(
              'rowData',
              this.rowData
            );

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

  previousPage() {

    if (this.currentPage > 1) {

      this.currentPage--;

      this.loadEmployees();

    }

  }

  nextPage() {

    if (

      this.currentPage <

      this.totalPages

    ) {

      this.currentPage++;

      this.loadEmployees();

    }

  }

  onPageSizeChange() {

    this.currentPage = 1;

    this.loadEmployees();

  }

  goToPage(page: number) {

    if (

      page < 1 ||

      page > this.totalPages ||

      page === this.currentPage

    ) {

      return;

    }

    this.currentPage = page;

    this.loadEmployees();

  }

  getPageNumbers(): (number | string)[] {

    const pages: (number | string)[] = [];

    if (this.totalPages <= 7) {

      for (

        let i = 1;

        i <= this.totalPages;

        i++

      ) {

        pages.push(i);

      }

      return pages;

    }

    if (this.currentPage <= 3) {

      pages.push(
        1,
        2,
        3,
        '...',
        this.totalPages
      );

      return pages;

    }

    if (

      this.currentPage >=

      this.totalPages - 2

    ) {

      pages.push(
        1,
        '...',
        this.totalPages - 2,
        this.totalPages - 1,
        this.totalPages
      );

      return pages;

    }

    pages.push(
      1,
      '...',
      this.currentPage - 1,
      this.currentPage,
      this.currentPage + 1,
      '...',
      this.totalPages
    );

    return pages;

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

  onSortChanged() {

    if (!this.gridApi) {

      return;

    }

    const sortedColumn =
      this.gridApi
        .getColumnState()
        .find(
          column => column.sort
        );

    if (sortedColumn) {

      this.currentSortField =
        sortedColumn.colId;

      this.currentSortOrder =
        sortedColumn.sort ?? '';

    }
    else {

      this.currentSortField = '';

      this.currentSortOrder = '';

    }

    this.currentPage = 1;

    this.loadEmployees();

  }

  onQuickFilter() {

    this.searchSubject.next(
      this.searchText
    );

  }


  clearSearch() {

    this.searchText = '';

    this.currentPage = 1;

    this.loadEmployees();

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

            if (

              this.rowData.length === 1 &&

              this.currentPage > 1

            ) {

              this.currentPage--;

            }

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