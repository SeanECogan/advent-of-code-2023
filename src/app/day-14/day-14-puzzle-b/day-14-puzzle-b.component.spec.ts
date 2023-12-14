import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day14PuzzleBComponent } from './day-14-puzzle-b.component';

describe('Day14PuzzleBComponent', () => {
  let component: Day14PuzzleBComponent;
  let fixture: ComponentFixture<Day14PuzzleBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day14PuzzleBComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day14PuzzleBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
