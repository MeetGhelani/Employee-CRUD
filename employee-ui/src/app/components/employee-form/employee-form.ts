import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  constructor(
    private employeeService: EmployeeService
  ) {}

  addEmployee() {

    this.employeeService
      .addEmployee({
        name: this.name,
        email: this.email,
        department: this.department
      })
      .subscribe(() => {

        this.name = '';
        this.email = '';
        this.department = '';

        window.location.reload();

      });

  }
}