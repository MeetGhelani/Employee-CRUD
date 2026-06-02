import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeList } from './components/employee-list/employee-list';
import { EmployeeForm } from './components/employee-form/employee-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
            EmployeeList,
          EmployeeForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('employee-ui');
}
