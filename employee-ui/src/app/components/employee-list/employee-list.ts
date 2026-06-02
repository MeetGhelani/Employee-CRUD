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

  ngOnInit(): void {

    this.employeeService
      .getEmployees()
      .subscribe(data => {

        this.employees.set(data);

        this.loading.set(false);

      });

  }
}