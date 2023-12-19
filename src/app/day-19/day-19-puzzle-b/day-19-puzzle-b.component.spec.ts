import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day19PuzzleBComponent } from './day-19-puzzle-b.component';

describe('Day19PuzzleBComponent', () => {
  let component: Day19PuzzleBComponent;
  let fixture: ComponentFixture<Day19PuzzleBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day19PuzzleBComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day19PuzzleBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
