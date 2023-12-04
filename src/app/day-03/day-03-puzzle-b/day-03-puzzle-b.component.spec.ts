import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day03PuzzleBComponent } from './day-03-puzzle-b.component';

describe('Day03PuzzleBComponent', () => {
  let component: Day03PuzzleBComponent;
  let fixture: ComponentFixture<Day03PuzzleBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day03PuzzleBComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day03PuzzleBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
