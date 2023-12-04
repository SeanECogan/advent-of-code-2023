import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day04PuzzleAComponent } from './day-04-puzzle-a.component';

describe('Day04PuzzleAComponent', () => {
  let component: Day04PuzzleAComponent;
  let fixture: ComponentFixture<Day04PuzzleAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day04PuzzleAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day04PuzzleAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
