import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day13PuzzleBComponent } from './day-13-puzzle-b.component';

describe('Day13PuzzleBComponent', () => {
  let component: Day13PuzzleBComponent;
  let fixture: ComponentFixture<Day13PuzzleBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day13PuzzleBComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day13PuzzleBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
