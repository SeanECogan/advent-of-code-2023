import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day20PuzzleBComponent } from './day-20-puzzle-b.component';

describe('Day20PuzzleBComponent', () => {
  let component: Day20PuzzleBComponent;
  let fixture: ComponentFixture<Day20PuzzleBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day20PuzzleBComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day20PuzzleBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
