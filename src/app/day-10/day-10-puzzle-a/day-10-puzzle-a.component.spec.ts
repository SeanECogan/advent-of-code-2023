import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day10PuzzleAComponent } from './day-10-puzzle-a.component';

describe('Day10PuzzleAComponent', () => {
  let component: Day10PuzzleAComponent;
  let fixture: ComponentFixture<Day10PuzzleAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day10PuzzleAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day10PuzzleAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
