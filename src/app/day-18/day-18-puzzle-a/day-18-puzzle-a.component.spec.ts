import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day18PuzzleAComponent } from './day-18-puzzle-a.component';

describe('Day18PuzzleAComponent', () => {
  let component: Day18PuzzleAComponent;
  let fixture: ComponentFixture<Day18PuzzleAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day18PuzzleAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day18PuzzleAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
