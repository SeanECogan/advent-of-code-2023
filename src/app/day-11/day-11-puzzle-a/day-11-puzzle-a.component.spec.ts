import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day11PuzzleAComponent } from './day-11-puzzle-a.component';

describe('Day11PuzzleAComponent', () => {
  let component: Day11PuzzleAComponent;
  let fixture: ComponentFixture<Day11PuzzleAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day11PuzzleAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day11PuzzleAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
