import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeActionRenderer } from './employee-action-renderer';

describe('EmployeeActionRenderer', () => {
  let component: EmployeeActionRenderer;
  let fixture: ComponentFixture<EmployeeActionRenderer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeActionRenderer],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeActionRenderer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
