import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditExperiencePage } from './edit-experience.page';

describe('EditExperiencePage', () => {
  let component: EditExperiencePage;
  let fixture: ComponentFixture<EditExperiencePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditExperiencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
