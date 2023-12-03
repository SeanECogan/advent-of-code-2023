import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day01PuzzleBComponent } from './day-01-puzzle-b.component';

describe('Day01PuzzleBComponent', () => {
  let component: Day01PuzzleBComponent;
  let fixture: ComponentFixture<Day01PuzzleBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day01PuzzleBComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day01PuzzleBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
