import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterDocentePage } from './register-docente.page';

describe('RegisterDocentePage', () => {
  let component: RegisterDocentePage;
  let fixture: ComponentFixture<RegisterDocentePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegisterDocentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
