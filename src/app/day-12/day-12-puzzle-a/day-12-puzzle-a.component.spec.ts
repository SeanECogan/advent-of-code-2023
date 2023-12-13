import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day12PuzzleAComponent } from './day-12-puzzle-a.component';

describe('Day12PuzzleAComponent', () => {
  let component: Day12PuzzleAComponent;
  let fixture: ComponentFixture<Day12PuzzleAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day12PuzzleAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day12PuzzleAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
