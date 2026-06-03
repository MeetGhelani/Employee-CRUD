import { Component, OnInit, signal } from '@angular/core';

import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee';

@Component({
  selector: 'app-employee-list',
  imports: [],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css'
})
export class EmployeeList implements OnInit {

  loading = signal(true);

  employees = signal<Employee[]>([]);

  constructor(
    private employeeService: EmployeeService
  ) {}

loadEmployees() {

  this.loading.set(true);

  this.employeeService
    .getEmployees()
    .subscribe(data => {

      this.employees.set(data);

      this.loading.set(false);

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
}