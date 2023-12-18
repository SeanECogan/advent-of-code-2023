import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day18PuzzleBComponent } from './day-18-puzzle-b.component';

describe('Day18PuzzleBComponent', () => {
  let component: Day18PuzzleBComponent;
  let fixture: ComponentFixture<Day18PuzzleBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day18PuzzleBComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day18PuzzleBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
