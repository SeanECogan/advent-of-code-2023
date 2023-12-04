import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day02PuzzleAComponent } from './day-02-puzzle-a.component';

describe('Day01PuzzleAComponent', () => {
  let component: Day02PuzzleAComponent;
  let fixture: ComponentFixture<Day02PuzzleAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day02PuzzleAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day02PuzzleAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
