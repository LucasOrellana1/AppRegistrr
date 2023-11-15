import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdatePassPage } from './update-pass.page';

describe('UpdatePassPage', () => {
  let component: UpdatePassPage;
  let fixture: ComponentFixture<UpdatePassPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdatePassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
