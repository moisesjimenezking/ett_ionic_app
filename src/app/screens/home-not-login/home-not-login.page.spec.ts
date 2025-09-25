import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeNotLoginPage } from './home-not-login.page';

describe('HomeNotLoginPage', () => {
  let component: HomeNotLoginPage;
  let fixture: ComponentFixture<HomeNotLoginPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HomeNotLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
