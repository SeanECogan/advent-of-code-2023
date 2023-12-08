import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day08PuzzleAComponent } from './day-08-puzzle-a.component';

describe('Day08PuzzleAComponent', () => {
  let component: Day08PuzzleAComponent;
  let fixture: ComponentFixture<Day08PuzzleAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day08PuzzleAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day08PuzzleAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
