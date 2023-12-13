import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day12PuzzleBComponent } from './day-12-puzzle-b.component';

describe('Day12PuzzleBComponent', () => {
  let component: Day12PuzzleBComponent;
  let fixture: ComponentFixture<Day12PuzzleBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day12PuzzleBComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day12PuzzleBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
