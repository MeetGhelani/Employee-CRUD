import {
  Component,
  OnInit
}
from '@angular/core';

import { CommonModule }
from '@angular/common';

import { DepartmentService }
from '../../services/department';

import { Department }
from '../../models/department';

import { FormsModule }
from '@angular/forms';

import { ToastService }
from '../../services/toast';

import{ChangeDetectorRef} from '@angular/core' ;

import {
  MasterDataRefreshService
}
from '../../services/master-data-refresh';

@Component({
  selector: 'app-department-master',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './department-master.html',
  styleUrl: './department-master.css'
})
export class DepartmentMaster
implements OnInit {

  departments:
    Department[] = [];

  searchText = '';

  isAddMode = false;

  isEditMode = false;

  editingDepartmentId = 0;

  departmentName = '';

  departmentError = '';

  departmentCount = 0;

  deleteError = '';

  isDeleteMode = false;

  isDeleting = false;

  deletingDepartmentId = 0;

  deletingDepartmentName = '';

constructor(
  private departmentService:
    DepartmentService,

  private toastService:
    ToastService,

  private refreshService:
    MasterDataRefreshService,

  private cdr:
    ChangeDetectorRef
) {}

  ngOnInit(): void {

   this.loadDepartments();

  }

  loadDepartments(
    callback?: () => void
  ): void {

    this.departmentService
      .getDepartments()
      .subscribe({

        next: (data) => {

      this.departments = [...data];

      this.departmentCount =
        this.departments.length;
          if (callback) {

            callback();

          }

        },

        error: (error) => {

          console.error(
            'Error loading departments',
            error
          );

        }

      });

  }

  showAddForm(): void {

    this.isAddMode = true;

    this.isEditMode = false;

    this.departmentName = '';

    this.departmentError = '';

  }

  showEditForm(
    department: Department
  ): void {

    this.isEditMode = true;

    this.isAddMode = false;

    this.isDeleteMode = false;

    this.editingDepartmentId =
      department.departmentId;

    this.departmentName =
      department.departmentName;

    this.departmentError = '';

  }

  showDeleteConfirmation(
    department: Department
  ): void {

    this.departmentError = '';

    this.isDeleteMode = true;

    this.isAddMode = false;

    this.isEditMode = false;

    this.deletingDepartmentId =
      department.departmentId;

    this.deletingDepartmentName =
      department.departmentName;

    this.deleteError = '';

  }

  cancelForm(): void {

    this.isAddMode = false;

    this.isEditMode = false;

    this.isDeleteMode = false;

    this.editingDepartmentId = 0;

    this.deletingDepartmentId = 0;

    this.departmentName = '';

    this.deletingDepartmentName = '';

    this.departmentError = '';

    this.deleteError = '';

    this.isDeleting = false;

  }

  validateDepartmentName(
    departmentName: string
  ): boolean {

    this.departmentError = '';

    if (!departmentName) {

      this.departmentError =
        'Department name is required';

      return false;

    }

    if (
      departmentName.length < 2
    ) {

      this.departmentError =
        'Department name must be at least 2 characters';

      return false;

    }

    if (
      departmentName.length > 100
    ) {

      this.departmentError =
        'Department name cannot exceed 100 characters';

      return false;

    }

    const validNamePattern =
      /^(?=.*[A-Za-z])[A-Za-z0-9\s]+$/;

    if (
      !validNamePattern.test(
        departmentName
      )
    ) {

      this.departmentError =
        'Please enter a valid name';

      return false;

    }

    return true;

  }

  saveDepartment(): void {

    const departmentName =
      this.departmentName.trim();

    if (
      !this.validateDepartmentName(
        departmentName
      )
    ) {

      return;

    }

    this.departmentService
      .addDepartment(
        departmentName
      )
      .subscribe({

        next: (response: any) => {

          this.loadDepartments(() => {

            this.cancelForm();

            this.refreshService.notifyRefresh();

            this.toastService.show(
              response?.message ??
              '✓ Department added successfully',
              'success'
            );

          });

        },

        error: (error) => {

          if (error.status === 409) {

            this.departmentError =
              error.error.message;

            this.cdr.detectChanges();

            return;

          }

          this.toastService.show(
            '❌ Unable to add department',
            'error'
          );

        }

      });

  }

  updateDepartment(): void {

    const departmentName =
      this.departmentName.trim();

    if (
      !this.validateDepartmentName(
        departmentName
      )
    ) {

      return;

    }

    this.departmentService
      .updateDepartment(
        this.editingDepartmentId,
        departmentName
      )
      .subscribe({

        next: (response: any) => {

        this.loadDepartments(() => {

          this.cancelForm();

          this.refreshService.notifyRefresh();

          this.toastService.show(
            response?.message ??
            'Department updated successfully',
            'success'
          );

        });

      },

        error: (error) => {

          if (error.status === 409) {

            this.departmentError =
              error.error.message;

            this.cdr.detectChanges();

            return;

          }

          this.toastService.show(
            '❌ Unable to update department',
            'error'
          );

        }

      });

  }

  deleteDepartment(): void {

        if (this.isDeleting) {

      return;

    }

    this.deleteError = '';

    this.isDeleting = true;

    this.departmentService
      .deleteDepartment(
        this.deletingDepartmentId
      )
      .subscribe({

        next: (response: any) => {

          this.isDeleting = false;

          this.loadDepartments(() => {

            this.cancelForm();

            this.refreshService.notifyRefresh();

            this.toastService.show(
              response?.message ??
              'Department deleted successfully',
              'success'
            );

          });

        },

        error: (error) => {

          this.isDeleting = false;

          this.deleteError =

            error?.error?.message ??
            
            '❌ Unable to delete department';

          this.cdr.detectChanges();

        }

      });

  }

  clearDepartmentError(): void {

  if (this.departmentError) {

    this.departmentError = '';

  }

}

  get filteredDepartments(): Department[] {

    const search =
      this.searchText
        .trim()
        .toLowerCase();

    if (!search) {

      return this.departments;

    }

    return this.departments.filter(
      department =>
        department.departmentName
          .toLowerCase()
          .includes(search)
    );

  }

}