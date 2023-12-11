import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day11PuzzleBComponent } from './day-11-puzzle-b.component';

describe('Day11PuzzleBComponent', () => {
  let component: Day11PuzzleBComponent;
  let fixture: ComponentFixture<Day11PuzzleBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day11PuzzleBComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day11PuzzleBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
