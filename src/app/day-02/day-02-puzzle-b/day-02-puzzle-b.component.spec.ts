import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day02PuzzleBComponent } from './day-02-puzzle-b.component';

describe('Day02PuzzleBComponent', () => {
  let component: Day02PuzzleBComponent;
  let fixture: ComponentFixture<Day02PuzzleBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day02PuzzleBComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day02PuzzleBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
