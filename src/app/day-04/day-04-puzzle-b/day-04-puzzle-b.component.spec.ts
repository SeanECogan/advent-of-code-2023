import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day04PuzzleBComponent } from './day-04-puzzle-b.component';

describe('Day04PuzzleBComponent', () => {
  let component: Day04PuzzleBComponent;
  let fixture: ComponentFixture<Day04PuzzleBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day04PuzzleBComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day04PuzzleBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
