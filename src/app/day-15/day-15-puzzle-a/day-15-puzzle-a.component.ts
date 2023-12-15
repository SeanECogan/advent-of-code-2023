import { Component } from '@angular/core';
import { PuzzleSolverService } from '../puzzle-solver.service';

@Component({
  selector: 'app-day-15-puzzle-a',
  standalone: true,
  imports: [],
  templateUrl: './day-15-puzzle-a.component.html',
  styleUrl: './day-15-puzzle-a.component.sass'
})
export class Day15PuzzleAComponent {
  public puzzleInput : string;
  public puzzleOutput : number | null;

  constructor(private readonly _puzzleSolverService : PuzzleSolverService) {
    this.puzzleInput = '';
    this.puzzleOutput = null;
  }

  public puzzleInputTextAreaInputHandler(e : any) {
    this.puzzleInput = e.target.value;
  }

  public solvePuzzleButtonClickHandler(e : any) {
    this.puzzleOutput = this._puzzleSolverService.SolvePuzzleA(this.puzzleInput);

    console.log(this.puzzleOutput);
  }
}
