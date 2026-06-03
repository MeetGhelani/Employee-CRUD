import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

import { Employee } from '../models/employee';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl =
    `${environment.apiUrl}/employees`;

    selectedEmployee =
    signal<Employee | null>(null);

    private employeeUpdatedSource = new Subject<void>();

    employeeUpdated$ =
    this.employeeUpdatedSource.asObservable();

  constructor(
    private http: HttpClient
  ) {}

  notifyEmployeeUpdated() {
    this.employeeUpdatedSource.next();
  } 

  getEmployees(): Observable<Employee[]> {

    return this.http.get<Employee[]>(
      this.apiUrl
    );

  }

  addEmployee(employee: {
    name: string;
    email: string;
    department: string;
  }) {

    return this.http.post(
      this.apiUrl,
      employee
    );
}

  deleteEmployee(id: number) {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );

  }

  updateEmployee(
  id: number,
  employee: {
    name: string;
    email: string;
    department: string;
  }
  ) {

    return this.http.put(
      `${this.apiUrl}/${id}`,
      employee
    );

  }
}