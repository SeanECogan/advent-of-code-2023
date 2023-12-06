import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day05PuzzleAComponent } from './day-05-puzzle-a.component';

describe('Day05PuzzleAComponent', () => {
  let component: Day05PuzzleAComponent;
  let fixture: ComponentFixture<Day05PuzzleAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day05PuzzleAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day05PuzzleAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
