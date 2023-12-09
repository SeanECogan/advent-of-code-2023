import { Injectable } from '@angular/core';

class Node {
  id: string;
  left: string;
  right: string;

  constructor(
    id: string,
    left: string,
    right: string
  ) {
    this.id = id;
    this.left = left;
    this.right = right;
  }
}

@Injectable({
  providedIn: 'root'
})
export class PuzzleSolverService {

  constructor() { }

  public SolvePuzzleA(input: string): number {
    const inputLines = input.split(/\r?\n|\r|\n/g);

    let extrapolation = 0;

    inputLines.map((il) => {
      const sequences: number[][] = [];

      sequences.push(il.split(/\s+/).map(part => +(part.trim())));

      while(!this.SequenceIsAllZeroes(sequences[sequences.length - 1])) {
        const newSequence: number[] = [];

        for (let i = 0; i < (sequences[sequences.length - 1].length - 1); i++) {
          newSequence.push(sequences[sequences.length - 1][i + 1] - sequences[sequences.length - 1][i]);
        }

        sequences.push(newSequence);
      }

      for (let i = sequences.length - 1; i > 0; i--) {
        sequences[i - 1].push(sequences[i - 1][sequences[i - 1].length - 1] + sequences[i][sequences[i].length - 1]);
      }

      extrapolation += sequences[0][sequences[0].length - 1];
    });

    return extrapolation;
  }

  public SolvePuzzleB(input: string): number {
    const inputLines = input.split(/\r?\n|\r|\n/g);

    let extrapolation = 0;

    inputLines.map((il) => {
      const sequences: number[][] = [];

      sequences.push(il.split(/\s+/).map(part => +(part.trim())));

      while(!this.SequenceIsAllZeroes(sequences[sequences.length - 1])) {
        const newSequence: number[] = [];

        for (let i = 0; i < (sequences[sequences.length - 1].length - 1); i++) {
          newSequence.push(sequences[sequences.length - 1][i + 1] - sequences[sequences.length - 1][i]);
        }

        sequences.push(newSequence);
      }

      for (let i = sequences.length - 1; i > 0; i--) {
        sequences[i - 1].unshift(sequences[i - 1][0] - sequences[i][0]);
      }

      extrapolation += sequences[0][0];
    });

    return extrapolation;
  }

  private SequenceIsAllZeroes(sequence: number[]): boolean {
    const numberOfZeroes = sequence.filter(s => s == 0).length;

    return numberOfZeroes == sequence.length;
  }
}
