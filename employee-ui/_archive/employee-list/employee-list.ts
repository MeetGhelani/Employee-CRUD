/*import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../src/app/models/employee';
import { EmployeeService } from '../../src/app/services/employee';
import { ToastService } from '../../src/app/services/toast';

@Component({
  selector: 'app-employee-list',
  imports: [FormsModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css'
})
export class EmployeeList implements OnInit {

  loading = signal(true);

  employees = signal<Employee[]>([]);

    searchTerm = '';
    sortBy = '';
    sortOrder = '';
    
    showDeleteModal = false;

    employeeToDeleteId:
    number | null = null;
    private noResultsToastShown = false

  constructor(
    private employeeService: EmployeeService,
    private toastService: ToastService,
    
    
  ) {}
loadEmployees() {

  this.loading.set(true);

  this.employeeService
    .getEmployees(
      this.searchTerm,
      this.sortBy,
      this.sortOrder
    )
    .subscribe(data => {

      this.employees.set(data);

      this.loading.set(false);

      if (
        data.length === 0 &&
        this.searchTerm.trim() &&
        !this.noResultsToastShown
      ) {

        this.noResultsToastShown = true;

        this.toastService.show(
          '⚠ No employees found',
          'warning'
        );

      }
      else if (data.length > 0) {

        this.noResultsToastShown = false;

      }

    });

}
  
  ngOnInit(): void {

    this.loadEmployees();

    this.employeeService
      .employeeUpdated$
      .subscribe(data => {

        this.loadEmployees();

      });

  }

  editEmployee(
      employee: Employee
    ) {

      this.employeeService
        .selectedEmployee
        .set(employee);

  }

  openDeleteModal(id: number) {

  this.employeeToDeleteId = id;

  this.showDeleteModal = true;

}

  confirmDelete() {

    const selectedEmployee =
    this.employeeService
      .selectedEmployee();

    if (!this.employeeToDeleteId) {

      return;

    }

    this.employeeService
      .deleteEmployee(
        this.employeeToDeleteId
      )
      .subscribe(() => {


        if (
          selectedEmployee &&
          selectedEmployee.id ===
            this.employeeToDeleteId
        ) {

          this.employeeService
            .selectedEmployee
            .set(null);

        }

        this.showDeleteModal = false;

        this.employeeToDeleteId = null;

        this.loadEmployees();

        this.toastService.show(
          '✓ Employee deleted successfully',
          'success'
        );

      });

  }

  cancelDelete() {

    this.showDeleteModal = false;

    this.employeeToDeleteId = null;

  }

  private searchTimeout: any;

  onSearch() {

    clearTimeout(
      this.searchTimeout
    );

    this.searchTimeout =
      setTimeout(() => {

        this.loadEmployees();

      }, 300);

  }

  clearSearch() {

      this.searchTerm = '';

      this.loadEmployees();

    }

    toggleSort(column: string) {

    if (this.sortBy !== column) {

      this.sortBy = column;
      this.sortOrder = 'asc';

    }
    else if (this.sortOrder === 'asc') {

      this.sortOrder = 'desc';

    }
    else {

      this.sortBy = '';
      this.sortOrder = '';

    }

    this.loadEmployees();

  }

  resetSorting() {

    this.sortBy = '';
    this.sortOrder = '';

    this.loadEmployees();

  }
}*/