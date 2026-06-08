import {
  Component,
  OnInit, HostListener
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import { DesignationService }
from '../../services/designation';

import { Designation }
from '../../models/designation';

import { FormsModule }
from '@angular/forms';

import { DepartmentService }
from '../../services/department';

import { Department }
from '../../models/department';

import { ToastService }
from '../../services/toast';

import {
  ChangeDetectorRef
} from '@angular/core';

import {
  MasterDataRefreshService
}
from '../../services/master-data-refresh';

@Component({
  selector: 'app-designation-master',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './designation-master.html',
  styleUrl: './designation-master.css'
})

export class DesignationMaster
implements OnInit {

  designations:
    Designation[] = [];

  departments:
  Department[] = [];

  selectedDepartmentId = 0;

  selectedFilterDepartmentName =
    'All Departments';

  showFilterDepartmentDropdown =
    false;

  searchText = '';

  isAddMode = false;

  isEditMode = false;

  filterDepartmentId = 0;

  editingDesignationId = 0;

  isDeleteMode = false;

  isDeleting = false;

  deletingDesignationId = 0;

  deletingDesignationName = '';

  designationName = '';

  designationError = '';

  deleteError = '';

  selectedDepartmentName =
    'Select Department';

  showDepartmentDropdown =
    false;

constructor(
  private designationService:
    DesignationService,

  private departmentService:
    DepartmentService,

  private toastService:
    ToastService,

  private cdr:
    ChangeDetectorRef,

  private refreshService:
  MasterDataRefreshService
) {}

  ngOnInit(): void {

    this.loadDepartments();

    this.loadDesignations();

    this.refreshService
      .refresh$
      .subscribe(() => {

        this.loadDepartments();

        this.loadDesignations();

      });

  }

  loadDepartments(): void {

    this.departmentService
      .getDepartments()
      .subscribe({

        next: (data) => {

          this.departments = [...data];

          if (this.filterDepartmentId === 0) {

            this.selectedFilterDepartmentName =
              'All Departments';

          }
          else {

            const department =
              this.departments.find(
                x =>
                  x.departmentId ===
                  this.filterDepartmentId
              );

            this.selectedFilterDepartmentName =
              department?.departmentName ??
              'All Departments';

          }

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(
            'Error loading departments',
            error
          );

        }

      });

  }

  loadDesignations(
    callback?: () => void
  ): void {

    this.designationService
      .getDesignations()
      .subscribe({

        next: (data) => {

          this.designations = [...data];

          this.cdr.detectChanges();

          if (callback) {

            callback();

          }

        },

        error: (error) => {

          console.error(
            'Error loading designations',
            error
          );

        }

      });

  }

  showAddForm(): void {

    this.loadDepartments();

    this.isAddMode = true;

    this.isEditMode = false;

    this.isDeleteMode = false;

    this.designationName = '';

    this.designationError = '';

    this.selectedDepartmentId = 0;

    this.selectedDepartmentName =
      'Select Department';

    this.showDepartmentDropdown =
    false;

  }

  cancelForm(): void {

    this.isAddMode = false;

    this.isEditMode = false;

    this.isDeleteMode = false;

    this.editingDesignationId = 0;

    this.deletingDesignationId = 0;

    this.isDeleting = false;

    this.designationName = '';

    this.designationError = '';

    this.selectedDepartmentId = 0;

    this.selectedDepartmentName =
      'Select Department';

    this.showDepartmentDropdown =
      false;

    this.deletingDesignationName = '';

    this.deleteError = '';

    this.searchText = '';

  }

  resetListFilters(): void {

    console.log('RESETTING FILTERS');

    this.filterDepartmentId = 0;

    this.selectedFilterDepartmentName =
      'All Departments';

    console.log(
      this.selectedFilterDepartmentName
    );

    this.searchText = '';

    this.cdr.detectChanges();

  }

    showEditForm(
      designation: Designation
    ): void {

    this.loadDepartments();

      this.isEditMode = true;

      this.isAddMode = false;

      this.isDeleteMode = false;

      this.editingDesignationId =
        designation.designationId;

      this.designationName =
        designation.designationName;

      this.selectedDepartmentId =
        designation.departmentId;

      const department =
        this.departments.find(
          x =>
            x.departmentId ===
            designation.departmentId
        );

      this.selectedDepartmentName =
        department?.departmentName ??
        'Select Department';

      this.designationError = '';

    }

    showDeleteConfirmation(
      designation: Designation
    ): void {

      this.designationError = '';

      this.deleteError = '';

      this.isDeleteMode = true;

      this.isAddMode = false;

      this.isEditMode = false;

      this.deletingDesignationId =
        designation.designationId;

      this.deletingDesignationName =
        designation.designationName;

    }

  selectDepartment(
    department: Department
  ): void {

    this.selectedDepartmentId =
      department.departmentId;

    this.selectedDepartmentName =
      department.departmentName;

    this.showDepartmentDropdown =
      false;

  }

  clearDesignationError(): void {

    this.designationError = '';

  }

  validateDesignationName(
    designationName: string
  ): boolean {

    this.designationError = '';

    if (
      this.selectedDepartmentId === 0
    ) {

      this.designationError =
        'Please select a department';

      return false;

    }

    if (!designationName) {

      this.designationError =
        'Designation name is required';

      return false;

    }

    if (
      designationName.length < 2
    ) {

      this.designationError =
        'Designation name must be at least 2 characters';

      return false;

    }

    const validNamePattern =
      /^(?=.*[A-Za-z])[A-Za-z0-9\s]+$/;

    if (
      !validNamePattern.test(
        designationName
      )
    ) {

      this.designationError =
        'Please enter a valid name';

      return false;

    }

    if (
      designationName.length > 100
    ) {

      this.designationError =
        'Designation name cannot exceed 100 characters';

      return false;

    }

    return true;

  }

  updateDesignation(): void {

    const designationName =
      this.designationName.trim();

    if (
      !this.validateDesignationName(
        designationName
      )
    ) {

      return;

    }

    this.designationService
      .updateDesignation(
        this.editingDesignationId,
        this.selectedDepartmentId,
        designationName
      )
      .subscribe({

        next: (response: any) => {

          this.loadDesignations(() => {

            this.resetListFilters();

            this.cancelForm();

          this.refreshService.notifyRefresh();

            this.toastService.show(

              response?.message ??

              'Designation updated successfully',

              'success'

            );

          });

        },

        error: (error) => {

          if (
            error.status === 409
          ) {

            this.designationError =
              error.error.message;

            this.cdr.detectChanges();

            return;

          }

          this.toastService.show(

            '❌ Unable to update designation',

            'error'

          );

        }

      });

  }


  saveDesignation(): void {

    if (
      !this.validateDesignationName(this.designationName.trim())
    ) {

      return;

    }

    const designationName =
      this.designationName.trim();

    this.designationService
      .addDesignation(
        this.selectedDepartmentId,
        designationName
      )
      .subscribe({

        next: (response: any) => {

          this.loadDesignations(() => {

            this.resetListFilters();

            this.cancelForm();

            this.refreshService.notifyRefresh();

            this.toastService.show(

              response?.message ??

              'Designation added successfully',

              'success'

            );

          });

        },

        error: (error) => {

            if (
          error.status === 409
        ) {

          this.designationError =
            error.error.message;

          console.log(
            'designationError:',
            this.designationError
          );

          this.cdr.detectChanges();

          return;

        }

          this.toastService.show(

            '❌ Unable to add designation',

            'error'

          );

        }

      });

  }

  deleteDesignation(): void {

    if (this.isDeleting) {

      return;

    }

    this.deleteError = '';

    this.isDeleting = true;

    this.designationService
      .deleteDesignation(
        this.deletingDesignationId
      )
      .subscribe({

        next: (response: any) => {

          this.isDeleting = false;

          this.loadDesignations(() => {

            this.resetListFilters();

            this.cancelForm();

            this.refreshService.notifyRefresh();

            this.toastService.show(

              response?.message ??

              'Designation deleted successfully',

              'success'

            );

          });

        },

        error: (error) => {

          this.isDeleting = false;

          this.deleteError =

            error?.error?.message ??

            'Unable to delete designation';

          this.cdr.detectChanges();

        }

      });

  }

  selectFilterDepartment(
    departmentId: number,
    departmentName: string
  ): void {

    this.filterDepartmentId =
      departmentId;

    this.selectedFilterDepartmentName =
      departmentName;

    this.showFilterDepartmentDropdown =
      false;

  }

  get filteredDesignations():
    Designation[] {

      const search =
        this.searchText
          .trim()
          .toLowerCase();

      return this.designations.filter(
        designation => {

          const matchesSearch =
            !search ||
            designation.designationName
              .toLowerCase()
              .includes(search);

          const matchesDepartment =this.filterDepartmentId === 0 ||
                                    designation.departmentId ===
                                    this.filterDepartmentId;

          return (
            matchesSearch &&
            matchesDepartment
          );

        }
      );

    }

    @HostListener('document:click')
      closeDropdowns(): void {

        this.showDepartmentDropdown = false;

        this.showFilterDepartmentDropdown = false;

      }

}