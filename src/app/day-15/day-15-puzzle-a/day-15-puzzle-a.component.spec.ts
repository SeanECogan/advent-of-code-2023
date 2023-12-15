import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day15PuzzleAComponent } from './day-15-puzzle-a.component';

describe('Day15PuzzleAComponent', () => {
  let component: Day15PuzzleAComponent;
  let fixture: ComponentFixture<Day15PuzzleAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day15PuzzleAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day15PuzzleAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
