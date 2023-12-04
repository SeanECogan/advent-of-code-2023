import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PuzzleSolverService {

  constructor() { }

  public SolvePuzzleA(input: string): number {
    const inputLines = input.split(/\r?\n|\r|\n/g);

    let calibrationValue = 0;

    inputLines.map((il) => {
      let gameScore = 0;

      const currentLine = il;

      const currentLineParts = currentLine.split('|');

      const winningNumbers = currentLineParts[0].split(':')[1].trim().split(/\s+/);
      const gameNumbers = currentLineParts[1].trim().split(/\s+/);

      gameNumbers.map((gm) => {
        if (winningNumbers.indexOf(gm) >= 0) {
          if (gameScore == 0) {
            gameScore = 1;
          } else {
            gameScore = gameScore * 2;
          }
        }
      });

      calibrationValue += gameScore;
    });

    return calibrationValue;
  }

  public SolvePuzzleB(input: string): number {
    const inputLines = input.split(/\r?\n|\r|\n/g);

    let scratchCardInstances: number[] = [];

    inputLines.map((il) => {
      scratchCardInstances.push(1);
    });

    for (let i = 0; i < scratchCardInstances.length; i++) {
      for (let x = 0; x < scratchCardInstances[i]; x++) {
        let gameScore = 0;

        const currentLine = inputLines[i];

        const currentLineParts = currentLine.split('|');

        const winningNumbers = currentLineParts[0].split(':')[1].trim().split(/\s+/);
        const gameNumbers = currentLineParts[1].trim().split(/\s+/);

        gameNumbers.map((gm) => {
          if (winningNumbers.indexOf(gm) >= 0) {
            gameScore++;
          }
        });

        for (let s = 1; s <= gameScore; s++) {
          scratchCardInstances[i + s]++;
        }
      }
    };

    return scratchCardInstances.reduce((runningTotal, currentNumber) => {
      return runningTotal + currentNumber;
    }, 0);
  }
}
