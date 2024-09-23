import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditAboutPage } from './edit-about.page';

describe('EditAboutPage', () => {
  let component: EditAboutPage;
  let fixture: ComponentFixture<EditAboutPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditAboutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
