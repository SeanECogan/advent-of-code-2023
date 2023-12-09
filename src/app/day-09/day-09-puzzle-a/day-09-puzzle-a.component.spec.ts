import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day09PuzzleAComponent } from './day-09-puzzle-a.component';

describe('Day09PuzzleAComponent', () => {
  let component: Day09PuzzleAComponent;
  let fixture: ComponentFixture<Day09PuzzleAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day09PuzzleAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day09PuzzleAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
