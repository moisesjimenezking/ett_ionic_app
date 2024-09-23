import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditEducationPage } from './edit-education.page';

describe('EditEducationPage', () => {
  let component: EditEducationPage;
  let fixture: ComponentFixture<EditEducationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditEducationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
