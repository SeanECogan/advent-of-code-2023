import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day07PuzzleAComponent } from './day-07-puzzle-a.component';

describe('Day07PuzzleAComponent', () => {
  let component: Day07PuzzleAComponent;
  let fixture: ComponentFixture<Day07PuzzleAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day07PuzzleAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day07PuzzleAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
