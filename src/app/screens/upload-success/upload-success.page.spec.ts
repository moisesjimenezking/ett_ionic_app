import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadSuccessPage } from './upload-success.page';

describe('UploadSuccessPage', () => {
  let component: UploadSuccessPage;
  let fixture: ComponentFixture<UploadSuccessPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UploadSuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
