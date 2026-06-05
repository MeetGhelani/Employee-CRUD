import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Designation }
from '../models/designation';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  private apiUrl =
    'http://localhost:5279/api/designations';

  constructor(
    private http: HttpClient
  ) {}

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

}