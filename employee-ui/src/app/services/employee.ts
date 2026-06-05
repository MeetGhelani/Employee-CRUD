import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

import { Employee } from '../models/employee';
import { environment } from '../../environments/environment';

import { PagedEmployeeResponse }
from '../models/paged-employee-response';

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

  getEmployees(
    search: string = '',
    sortBy: string = '',
    sortOrder: string = '',
    page: number = 1,
    pageSize: number = 10
  ): Observable<PagedEmployeeResponse>{

    return this.http.get<PagedEmployeeResponse>(
      this.apiUrl,
      {
        params: {
          search,
          sortBy,
          sortOrder,
          page,
          pageSize
        }
      }
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