import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day09PuzzleBComponent } from './day-09-puzzle-b.component';

describe('Day09PuzzleBComponent', () => {
  let component: Day09PuzzleBComponent;
  let fixture: ComponentFixture<Day09PuzzleBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day09PuzzleBComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day09PuzzleBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
