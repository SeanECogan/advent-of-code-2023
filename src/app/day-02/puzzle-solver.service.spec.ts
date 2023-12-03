import { TestBed } from '@angular/core/testing';

import { PuzzleSolverService } from './puzzle-solver.service';

describe('PuzzleSolverService', () => {
  let service: PuzzleSolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuzzleSolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
