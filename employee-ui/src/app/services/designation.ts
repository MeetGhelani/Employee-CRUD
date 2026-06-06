import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Designation }
from '../models/designation';

import { environment }
from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  private apiUrl =
    `${environment.apiUrl}/designations`;

  constructor(
    private http: HttpClient
  ) {}

  getDesignations():
  Observable<Designation[]> {

    return this.http.get<
      Designation[]
    >(
      this.apiUrl
    );

  }

  getDesignationsByDepartment(
    departmentId: number
  ):
  Observable<Designation[]> {

    return this.http.get<
      Designation[]
    >(
      `${this.apiUrl}/department/${departmentId}`
    );

  }

  addDesignation(
    departmentId: number,
    designationName: string
  ): Observable<any> {

    return this.http.post(
      this.apiUrl,
      {
        departmentId,
        designationName
      }
    );

  }

  updateDesignation(
    designationId: number,
    departmentId: number,
    designationName: string
  ): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/${designationId}`,
      {
        departmentId,
        designationName
      }
    );

  }

  deleteDesignation(
    designationId: number
  ): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${designationId}`
    );

  }

}