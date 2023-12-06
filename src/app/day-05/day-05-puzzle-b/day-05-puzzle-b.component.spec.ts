import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day05PuzzleBComponent } from './day-05-puzzle-b.component';

describe('Day05PuzzleBComponent', () => {
  let component: Day05PuzzleBComponent;
  let fixture: ComponentFixture<Day05PuzzleBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day05PuzzleBComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day05PuzzleBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
