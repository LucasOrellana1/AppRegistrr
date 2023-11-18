import { TestBed } from '@angular/core/testing';

import { AlumnoGuardGuard } from './alumno-guard.guard';

describe('AlumnoGuardGuard', () => {
  let guard: AlumnoGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AlumnoGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
