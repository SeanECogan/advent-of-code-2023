import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day17PuzzleBComponent } from './day-17-puzzle-b.component';

describe('Day17PuzzleBComponent', () => {
  let component: Day17PuzzleBComponent;
  let fixture: ComponentFixture<Day17PuzzleBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day17PuzzleBComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day17PuzzleBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
