import { Component } from '@angular/core';
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

  constructor(
    private employeeService: EmployeeService
  ) {}

  addEmployee(form: NgForm) {

  this.employeeService
    .addEmployee({
      name: this.name,
      email: this.email,
      department: this.department
    })
    .subscribe(() => {

      form.resetForm();

      this.employeeService.notifyEmployeeUpdated();

    });

}
}