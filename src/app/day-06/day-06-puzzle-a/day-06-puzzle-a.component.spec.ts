import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day06PuzzleAComponent } from './day-06-puzzle-a.component';

describe('Day06PuzzleAComponent', () => {
  let component: Day06PuzzleAComponent;
  let fixture: ComponentFixture<Day06PuzzleAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day06PuzzleAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day06PuzzleAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
