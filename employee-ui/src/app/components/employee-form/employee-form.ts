import { Component, effect , untracked} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { EmployeeService } from '../../services/employee';
import { ToastService } from '../../services/toast';

import { HostListener }
from '@angular/core';

import { CommonModule }
from '@angular/common';

import { Department }
from '../../models/department';

import { Designation }
from '../../models/designation';

import { DepartmentService }
from '../../services/department';

import { DesignationService }
from '../../services/designation';

@Component({
  selector: 'app-employee-form',
  imports: [FormsModule,
    CommonModule
  ],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css'
})
export class EmployeeForm {

  name = '';
  email = '';
  departmentId = 0;

  designationId = 0;

  departments: Department[] = [];

  designations: Designation[] = [];

   showDepartmentDropdown = false;

  showDesignationDropdown = false;

  departmentTouched = false;

  editingEmployeeId:
    number | null = null;

  duplicateEmailError = '';

  @HostListener('document:click')
    closeDropdowns() {

      this.showDepartmentDropdown =
        false;

      this.showDesignationDropdown =
        false;

    }
  
  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private designationService: DesignationService,
    private cdr: ChangeDetectorRef,
    private toastService: ToastService
  ) {

    effect(() => {

    const employee =
      this.employeeService
        .selectedEmployee();

    queueMicrotask(() => {

      untracked(() => {

     if (employee) {

        this.editingEmployeeId =
          employee.id;

        this.name =
          employee.name;

        this.email =
          employee.email;

        this.departmentId =
          employee.departmentId;

        this.designationId =
          employee.designationId;

        this.loadDesignations(
          employee.departmentId
        );

      }
        else {

          this.editingEmployeeId = null;

          this.email = '';

          this.departmentId = 0;

          this.designationId = 0;

          this.designations = [];

        }

        this.cdr.detectChanges();

      });

    });

  });

    this.loadDepartments();

  }

  loadDepartments() {

    this.departmentService
      .getDepartments()
      .subscribe({

        next: (data) => {

          this.departments = data;

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
    departmentId: number
  ) {

    if (!departmentId) {

      this.designations = [];

      this.designationId = 0;

      return;

    }

    this.designationService
      .getDesignationsByDepartment(
        departmentId
      )
      .subscribe({

        next: (data) => {

          this.designations = data;

        },

        error: (error) => {

          console.error(
            'Error loading designations',
            error
          );

        }

      });

  }
  onDepartmentChange() {

    this.designationId = 0;

    this.showDesignationDropdown = false;

    this.loadDesignations(
      this.departmentId
    );

  }

  get selectedDepartmentName(): string {  

    return this.departments.find(

      department =>

        department.departmentId ===

        this.departmentId

    )?.departmentName

    ?? 'Select Department';

  }

  get selectedDesignationName(): string {

    return this.designations.find(

      designation =>

        designation.designationId ===

        this.designationId

    )?.designationName

    ?? 'Select Designation';

  }

  selectDepartment(
    department: Department
  ) {

    this.departmentTouched = true;

    this.departmentId =
      department.departmentId;

    this.showDepartmentDropdown =
      false;

    this.onDepartmentChange();

  }

  selectDesignation(
    designation: Designation
  ) {

    this.designationId =
      designation.designationId;

    this.showDesignationDropdown =
      false;

  }

  saveEmployee(form: NgForm) {

    this.duplicateEmailError = '';

    const employeeData = {

      name: this.name,

      email: this.email,

      departmentId:
        this.departmentId,

      designationId:
        this.designationId

    };

    if (this.editingEmployeeId !== null) {

      this.employeeService
        .updateEmployee(
          this.editingEmployeeId,
          employeeData
        )
        .subscribe({

          next: () => {

            this.duplicateEmailError = '';

            this.editingEmployeeId = null;

            this.employeeService
              .selectedEmployee
              .set(null);

            form.resetForm();

            this.departmentId = 0;

            this.designationId = 0;

            this.designations = [];

            this.employeeService
              .notifyEmployeeUpdated();

            this.toastService.show(
              '✓ Employee updated successfully',
              'success'
            );

          },

         error: (error) => {

            if (error.status === 409) {

              this.duplicateEmailError =
                'Email already exists';

              this.toastService.show(
                '❌ Email already exists',
                'error'
              );

              this.cdr.detectChanges();

            }

          }

        });

    }
    else {

      this.employeeService
        .addEmployee(employeeData)
        .subscribe({

          next: () => {

            this.duplicateEmailError = '';

            form.resetForm();

            this.departmentId = 0;

            this.designationId = 0;

            this.designations = [];

            this.employeeService
              .notifyEmployeeUpdated();

            this.toastService.show(
              '✓ Employee added successfully',
              'success'
            );

          },

          error: (error) => {

            if (error.status === 409) {

              this.duplicateEmailError =
                'Email already exists';

              this.toastService.show(
                '❌ Email already exists',
                'error'
              );

            }

          }

        });

    }

  }

  clearForm() {

    this.editingEmployeeId = null;

    this.name = '';

    this.email = '';

    this.departmentId = 0;

    this.designationId = 0;

    this.designations = [];

    this.duplicateEmailError = '';

    this.employeeService
      .selectedEmployee
      .set(null);

  }

}