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

@Component({
  selector: 'app-designation-master',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './designation-master.html',
  styleUrl: './designation-master.css'
})

export class DesignationMaster
implements OnInit {

  designations:
    Designation[] = [];

  constructor(
    private designationService:
      DesignationService
  ) {}

  ngOnInit(): void {

    this.loadDesignations();

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

}