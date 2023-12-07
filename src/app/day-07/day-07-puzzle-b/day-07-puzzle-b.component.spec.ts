import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day07PuzzleBComponent } from './day-07-puzzle-b.component';

describe('Day07PuzzleBComponent', () => {
  let component: Day07PuzzleBComponent;
  let fixture: ComponentFixture<Day07PuzzleBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day07PuzzleBComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day07PuzzleBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
