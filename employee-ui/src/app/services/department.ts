import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Department }
from '../models/department';

import { environment }
from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

private apiUrl =
  `${environment.apiUrl}/departments`;

  constructor(
    private http: HttpClient
  ) {}

  getDepartments():
  Observable<Department[]> {

    return this.http.get<Department[]>(
      this.apiUrl
    );

  }

  addDepartment(
    departmentName: string
  ): Observable<any> {

    return this.http.post(
      this.apiUrl,
      {
        departmentName
      }
    );

  }

  updateDepartment(
    departmentId: number,
    departmentName: string
  ): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/${departmentId}`,
      {
        departmentName
      }
    );

  }

  deleteDepartment(
    departmentId: number
  ): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${departmentId}`
    );

  }

}