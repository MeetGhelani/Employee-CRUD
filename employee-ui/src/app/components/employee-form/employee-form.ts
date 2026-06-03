import { Component, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { EmployeeService } from '../../services/employee';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-employee-form',
  imports: [FormsModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css'
})
export class EmployeeForm {

  name = '';
  email = '';
  department = '';

  editingEmployeeId:
    number | null = null;

  duplicateEmailError = '';
  

  constructor(
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef,
    private toastService: ToastService

  ) {

    effect(() => {

      const employee =
        this.employeeService
          .selectedEmployee();

      if (employee) {

        this.editingEmployeeId =
          employee.id;

        this.name =
          employee.name;

        this.email =
          employee.email;

        this.department =
          employee.department;

      }
      else {

        this.editingEmployeeId = null;

        this.name = '';

        this.email = '';

        this.department = '';

      }

    });

  }

  saveEmployee(form: NgForm) {

    this.duplicateEmailError = '';

    const employeeData = {

      name: this.name,
      email: this.email,
      department: this.department

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

    this.department = '';

    this.employeeService
      .selectedEmployee
      .set(null);

  }

}