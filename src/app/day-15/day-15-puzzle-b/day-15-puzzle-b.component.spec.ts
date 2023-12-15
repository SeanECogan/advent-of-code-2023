import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day15PuzzleBComponent } from './day-15-puzzle-b.component';

describe('Day15PuzzleBComponent', () => {
  let component: Day15PuzzleBComponent;
  let fixture: ComponentFixture<Day15PuzzleBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day15PuzzleBComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day15PuzzleBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
