import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day16PuzzleBComponent } from './day-16-puzzle-b.component';

describe('Day16PuzzleBComponent', () => {
  let component: Day16PuzzleBComponent;
  let fixture: ComponentFixture<Day16PuzzleBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day16PuzzleBComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Day16PuzzleBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
