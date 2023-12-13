import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day13PuzzleAComponent } from './day-13-puzzle-a.component';

describe('Day13PuzzleAComponent', () => {
  let component: Day13PuzzleAComponent;
  let fixture: ComponentFixture<Day13PuzzleAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day13PuzzleAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day13PuzzleAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
