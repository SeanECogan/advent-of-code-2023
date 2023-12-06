import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day06PuzzleBComponent } from './day-06-puzzle-b.component';

describe('Day06PuzzleBComponent', () => {
  let component: Day06PuzzleBComponent;
  let fixture: ComponentFixture<Day06PuzzleBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day06PuzzleBComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day06PuzzleBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
