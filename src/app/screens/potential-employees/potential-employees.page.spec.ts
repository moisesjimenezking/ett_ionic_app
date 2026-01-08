import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PotentialEmployeesPage } from './potential-employees.page';

describe('PotentialEmployeesPage', () => {
  let component: PotentialEmployeesPage;
  let fixture: ComponentFixture<PotentialEmployeesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PotentialEmployeesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
