import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day08PuzzleBComponent } from './day-08-puzzle-b.component';

describe('Day08PuzzleBComponent', () => {
  let component: Day08PuzzleBComponent;
  let fixture: ComponentFixture<Day08PuzzleBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day08PuzzleBComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day08PuzzleBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
