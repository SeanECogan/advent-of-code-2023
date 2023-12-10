import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day10PuzzleBComponent } from './day-10-puzzle-b.component';

describe('Day10PuzzleBComponent', () => {
  let component: Day10PuzzleBComponent;
  let fixture: ComponentFixture<Day10PuzzleBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day10PuzzleBComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day10PuzzleBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
