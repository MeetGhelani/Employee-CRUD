import { Component , effect} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../../services/employee';

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

  constructor(
  private employeeService: EmployeeService
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

  });

}

  saveEmployee(form: NgForm) {

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
        .subscribe(() => {

          this.editingEmployeeId = null;

          this.employeeService
            .selectedEmployee
            .set(null);

          form.resetForm();

          this.employeeService
            .notifyEmployeeUpdated();

        });

    }
    else {

      this.employeeService
        .addEmployee(employeeData)
        .subscribe(() => {

          form.resetForm();

          this.employeeService
            .notifyEmployeeUpdated();

        });

    }
  }
}