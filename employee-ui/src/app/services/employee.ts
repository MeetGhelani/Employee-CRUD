import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Employee } from '../models/employee';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl =
    `${environment.apiUrl}/employees`;

  constructor(
    private http: HttpClient
  ) {}

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
}