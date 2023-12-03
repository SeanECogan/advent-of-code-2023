import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PuzzleSolverService {

  private readonly _maxRedCubes: number = 12;
  private readonly _maxGreenCubes: number = 13;
  private readonly _maxBlueCubes: number = 14;

  constructor() { }

  public SolvePuzzleA(input: string): number {
    const inputLines = input.split(/\r?\n|\r|\n/g);

    let calibrationValue = 0;

    inputLines.map((il) => {
      const lineParts = il.split(': ');
    
      if (this.GameIsPossible(lineParts[1])) {
        calibrationValue += this.ParseGameId(lineParts[0]);
      }
    });

    return calibrationValue;
  }

  public SolvePuzzleB(input: string): number {
    const inputLines = input.split(/\r?\n|\r|\n/g);

    let calibrationValue = 0;

    inputLines.map((il) => {
      const lineParts = il.split(': ');
      
      calibrationValue += this.CalculatePowerOfCubes(lineParts[1]);
    });

    return calibrationValue;
  }

  private ParseGameId(gameIdString: string): number {
    const gameIdStringParts = gameIdString.split(' ');

    return +(gameIdStringParts[1]);
  }

  private GameIsPossible(cubePullsString: string): boolean {
    let gameIsPossible = true;

    const cubePulls = cubePullsString.split('; ');

    cubePulls.map((cp) => {
      const cubeCounts = cp.split(', ');

      cubeCounts.map((cc) => {
        const cubeCountParts = cc.split(' ');

        const cubeCount = +(cubeCountParts[0]);
        const cubeColor = cubeCountParts[1];

        switch (cubeColor) {
          case 'red':
            if (cubeCount > this._maxRedCubes) {
              gameIsPossible = false;
            }
            break;

          case 'green':
            if (cubeCount > this._maxGreenCubes) {
              gameIsPossible = false;
            }
            break;

          case 'blue':
          default:
            if (cubeCount > this._maxBlueCubes) {
              gameIsPossible = false;
            }
            break;
        }
      });
    });

    return gameIsPossible;
  }

  private CalculatePowerOfCubes(cubePullsString: string): number {
    const cubePulls = cubePullsString.split('; ');

    let maxRedCubes = 0;
    let maxGreenCubes = 0;
    let maxBlueCubes = 0;

    cubePulls.map((cp) => {
      const cubeCounts = cp.split(', ');

      cubeCounts.map((cc) => {
        const cubeCountParts = cc.split(' ');

        const cubeCount = +(cubeCountParts[0]);
        const cubeColor = cubeCountParts[1];

        switch (cubeColor) {
          case 'red':
            if (cubeCount > maxRedCubes) {
              maxRedCubes = cubeCount;
            }
            break;

          case 'green':
            if (cubeCount > maxGreenCubes) {
              maxGreenCubes = cubeCount;
            }
            break;

          case 'blue':
          default:
            if (cubeCount > maxBlueCubes) {
              maxBlueCubes = cubeCount;
            }
            break;
        }
      });
    });

    return maxRedCubes * maxGreenCubes * maxBlueCubes;
  }
}
