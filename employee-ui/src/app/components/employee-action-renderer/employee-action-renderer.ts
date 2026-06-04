import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-employee-action-renderer',
  standalone: true,
  templateUrl: './employee-action-renderer.html',
  styleUrl: './employee-action-renderer.css'
})
export class EmployeeActionRenderer
  implements ICellRendererAngularComp {

  params: any;

  agInit(params: any): void {

    this.params = params;

  }

  refresh(): boolean {

    return false;

  }

  editEmployee() {

    this.params.edit(
      this.params.data
    );

  }

  deleteEmployee() {

    this.params.delete(
      this.params.data.id
    );

  }

}