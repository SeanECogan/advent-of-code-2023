import { Component } from '@angular/core';
import { PuzzleSolverService } from '../puzzle-solver.service';

@Component({
  selector: 'app-day-14-puzzle-b',
  standalone: true,
  imports: [],
  templateUrl: './day-14-puzzle-b.component.html',
  styleUrl: './day-14-puzzle-b.component.sass'
})
export class Day14PuzzleBComponent {
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
    this.puzzleOutput = this._puzzleSolverService.SolvePuzzleB(this.puzzleInput);

    console.log(this.puzzleOutput);
  }
}
