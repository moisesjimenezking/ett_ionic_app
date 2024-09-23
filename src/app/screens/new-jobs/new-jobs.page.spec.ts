import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewJobsPage } from './new-jobs.page';

describe('NewJobsPage', () => {
  let component: NewJobsPage;
  let fixture: ComponentFixture<NewJobsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewJobsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
