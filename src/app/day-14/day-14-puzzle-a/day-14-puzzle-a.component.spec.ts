import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day14PuzzleAComponent } from './day-14-puzzle-a.component';

describe('Day14PuzzleAComponent', () => {
  let component: Day14PuzzleAComponent;
  let fixture: ComponentFixture<Day14PuzzleAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day14PuzzleAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day14PuzzleAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
