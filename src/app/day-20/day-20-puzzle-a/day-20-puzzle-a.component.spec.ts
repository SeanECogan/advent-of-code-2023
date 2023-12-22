import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day20PuzzleAComponent } from './day-20-puzzle-a.component';

describe('Day20PuzzleAComponent', () => {
  let component: Day20PuzzleAComponent;
  let fixture: ComponentFixture<Day20PuzzleAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day20PuzzleAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day20PuzzleAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
