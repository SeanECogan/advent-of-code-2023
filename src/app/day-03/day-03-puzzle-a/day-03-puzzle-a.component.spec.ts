import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day03PuzzleAComponent } from './day-03-puzzle-a.component';

describe('Day03PuzzleAComponent', () => {
  let component: Day03PuzzleAComponent;
  let fixture: ComponentFixture<Day03PuzzleAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day03PuzzleAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day03PuzzleAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
