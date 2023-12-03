import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day01PuzzleAComponent } from './day-01-puzzle-a.component';

describe('Day01PuzzleAComponent', () => {
  let component: Day01PuzzleAComponent;
  let fixture: ComponentFixture<Day01PuzzleAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day01PuzzleAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day01PuzzleAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
