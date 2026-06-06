import { Component, signal } from '@angular/core';
import { EmployeeForm } from './components/employee-form/employee-form';
import { ToastService } from './services/toast';
import { CommonModule } from '@angular/common';
import { EmployeeGrid } from './components/employee-grid/employee-grid';
import { DepartmentMaster }
from './components/department-master/department-master';

import { DesignationMaster }
from './components/designation-master/designation-master';

@Component({
  selector: 'app-root',
  imports: [EmployeeForm,
        CommonModule,
      EmployeeGrid
    , DepartmentMaster, DesignationMaster],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('employee-ui');

  constructor(
  public toastService: ToastService
) {}
}
