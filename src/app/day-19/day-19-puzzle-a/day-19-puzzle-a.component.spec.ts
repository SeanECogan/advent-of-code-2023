import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day19PuzzleAComponent } from './day-19-puzzle-a.component';

describe('Day19PuzzleAComponent', () => {
  let component: Day19PuzzleAComponent;
  let fixture: ComponentFixture<Day19PuzzleAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day19PuzzleAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day19PuzzleAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
