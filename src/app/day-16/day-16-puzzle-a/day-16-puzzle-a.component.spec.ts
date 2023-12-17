import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day16PuzzleAComponent } from './day-16-puzzle-a.component';

describe('Day16PuzzleAComponent', () => {
  let component: Day16PuzzleAComponent;
  let fixture: ComponentFixture<Day16PuzzleAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day16PuzzleAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day16PuzzleAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
