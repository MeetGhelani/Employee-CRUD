import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import { DesignationService }
from '../../services/designation';

import { Designation }
from '../../models/designation';

import { FormsModule }
from '@angular/forms';

import { DepartmentService }
from '../../services/department';

import { Department }
from '../../models/department';

@Component({
  selector: 'app-designation-master',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './designation-master.html',
  styleUrl: './designation-master.css'
})

export class DesignationMaster
implements OnInit {

  designations:
    Designation[] = [];

  departments:
  Department[] = [];

  selectedDepartmentId = 0;

  searchText = '';

  isAddMode = false;

  isEditMode = false;

  isDeleteMode = false;

  designationName = '';

  designationError = '';

  selectedDepartmentName =
    'Select Department';

  showDepartmentDropdown =
    false;

  constructor(
    private designationService:
      DesignationService,

    private departmentService:
      DepartmentService
  ) {}

  ngOnInit(): void {

    this.loadDepartments();

    this.loadDesignations();

  }

  loadDepartments(): void {

    this.departmentService
      .getDepartments()
      .subscribe({

        next: (data) => {

          this.departments = data;

        },

        error: (error) => {

          console.error(
            'Error loading departments',
            error
          );

        }

      });

  }
  

  loadDesignations(): void {

    this.designationService
      .getDesignations()
      .subscribe({

        next: (data) => {

          this.designations = data;

        },

        error: (error) => {

          console.error(
            'Error loading designations',
            error
          );

        }

      });

  }

  showAddForm(): void {

    this.isAddMode = true;

    this.isEditMode = false;

    this.isDeleteMode = false;

    this.designationName = '';

    this.designationError = '';

    this.selectedDepartmentId = 0;

    this.selectedDepartmentName =
      'Select Department';

  }

  cancelForm(): void {

    this.isAddMode = false;

    this.isEditMode = false;

    this.isDeleteMode = false;

    this.designationName = '';

    this.designationError = '';

    this.selectedDepartmentId = 0;

    this.selectedDepartmentName =
      'Select Department';

    this.showDepartmentDropdown =
      false;

  }

  selectDepartment(
    department: Department
  ): void {

    this.selectedDepartmentId =
      department.departmentId;

    this.selectedDepartmentName =
      department.departmentName;

    this.showDepartmentDropdown =
      false;

  }

  get filteredDesignations():
    Designation[] {

      const search =
        this.searchText
          .trim()
          .toLowerCase();

      return this.designations.filter(
        designation => {

          const matchesSearch =
            !search ||
            designation.designationName
              .toLowerCase()
              .includes(search);

          const matchesDepartment =
            this.selectedDepartmentId === 0 ||
            designation.departmentId ===
            this.selectedDepartmentId;

          return (
            matchesSearch &&
            matchesDepartment
          );

        }
      );

    }

}