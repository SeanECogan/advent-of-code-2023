import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day17PuzzleAComponent } from './day-17-puzzle-a.component';

describe('Day17PuzzleAComponent', () => {
  let component: Day17PuzzleAComponent;
  let fixture: ComponentFixture<Day17PuzzleAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day17PuzzleAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day17PuzzleAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
