import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesDetailPage } from './courses-detail.page';

describe('CoursesDetailPage', () => {
  let component: CoursesDetailPage;
  let fixture: ComponentFixture<CoursesDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CoursesDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
