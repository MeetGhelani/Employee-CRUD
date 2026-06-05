import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeForm } from './components/employee-form/employee-form';
import { ToastService } from './services/toast';
import { CommonModule } from '@angular/common';
import { EmployeeGrid } from './components/employee-grid/employee-grid';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
            EmployeeForm,
        CommonModule,
      EmployeeGrid],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('employee-ui');

  constructor(
  public toastService: ToastService
) {}
}
