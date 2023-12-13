import { Injectable } from '@angular/core';

class SpringRow {
  springConditions: string;
  brokenSprings: number[];

  constructor(
    springConditions: string,
    brokenSprings: number[]
  ) {
    this.springConditions = springConditions;
    this.brokenSprings = brokenSprings;
  }
}

@Injectable({
  providedIn: 'root'
})
export class PuzzleSolverService {

  constructor() { }

  private cache: Map<string, number> = new Map<string, number>();
  private cacheHit: number = 0;
  private cacheMiss: number = 0;

  public SolvePuzzleA(input: string): number {
    const inputLines = input.split(/\r?\n|\r|\n/g);

    let arrangements = 0;
    
    this.cache = new Map<string, number>();
    this.cacheHit = 0;
    this.cacheMiss = 0;

    inputLines.map((il) => {

      const lineParts = il.split(/\s+/);

      const springConditions = lineParts[0];
      const brokenSprings = lineParts[1].split(',').map(part => +(part.trim()));

      const springRow = new SpringRow(
        springConditions,
        brokenSprings
      );

      arrangements += this.Calculate(springRow.springConditions, springRow.brokenSprings, 0);
    });

    console.log(this.cacheHit + ' cache hits.');
    console.log(this.cacheMiss + ' cache miss.');

    return arrangements;
  }

  public SolvePuzzleB(input: string): number {
    const inputLines = input.split(/\r?\n|\r|\n/g);

    let arrangements = 0;

    let currentLine = 1;

    this.cache = new Map<string, number>();
    this.cacheHit = 0;
    this.cacheMiss = 0;

    inputLines.map((il) => {

      const lineParts = il.split(/\s+/);

      const springConditions = lineParts[0];
      const brokenSprings = lineParts[1].split(',').map(part => +(part.trim()));

      let unfoldedSpringConditions = '';
      let unfoldedBrokenSprings: number[] = [];

      for (let i = 0; i < 5; i++) {
        unfoldedSpringConditions += springConditions + '?';
        unfoldedBrokenSprings = unfoldedBrokenSprings.concat(brokenSprings);
      }

      unfoldedSpringConditions = unfoldedSpringConditions.slice(0, unfoldedSpringConditions.length - 1);

      const springRow = new SpringRow(
        unfoldedSpringConditions,
        unfoldedBrokenSprings
      );

      arrangements += this.Calculate(springRow.springConditions, springRow.brokenSprings, 0);

      console.log('[' + new Date().toDateString() + ' ' + new Date().toTimeString() + '] Processed ' + currentLine + ' of ' + inputLines.length + ' lines.');

      currentLine++;
    });

    console.log(this.cacheHit + ' cache hits.');
    console.log(this.cacheMiss + ' cache miss.');

    return arrangements;
  }

  private Calculate(springConditions: string, brokenSprings: number[], possibilities: number): number {
    const key = `${springConditions}${brokenSprings.join(',')}`;

    if (this.cache.has(key)) {
      this.cacheHit++;
      return this.cache.get(key)!;
    } else {
      this.cacheMiss++;
      const value = this.GetPossibilities(springConditions, brokenSprings, possibilities);
      this.cache.set(key, value);
      return value;
    }
  }

  private GetPossibilities(springConditions: string, brokenSprings: number[], possibilities: number): number {
    while (true) {
      if (brokenSprings.length == 0) {
        if (springConditions.indexOf('#') < 0) {
          return possibilities + 1;
        } else {
          return possibilities;
        }
      }

      if (springConditions.length == 0) {
        return possibilities;
      }

      if (springConditions.startsWith('.')) {
        springConditions = springConditions.replace('.', '');
        continue;
      }

      if (springConditions.startsWith('?')) {
        return this.Calculate('.' + springConditions.slice(1), brokenSprings, possibilities) + 
               this.Calculate('#' + springConditions.slice(1), brokenSprings, possibilities);
      }

      if (springConditions.startsWith('#')) {
        if (brokenSprings.length == 0) {
          return possibilities;
        }

        if (springConditions.length < brokenSprings[0]) {
          return possibilities;
        }

        if (springConditions.slice(0, brokenSprings[0]).indexOf('.') >= 0) {
          return possibilities;
        }

        if (brokenSprings.length > 1) {
          if (springConditions.length < brokenSprings[0] + 1 || springConditions[brokenSprings[0]] == '#')
          {
              return possibilities;
          }

          springConditions = springConditions.slice(brokenSprings[0] + 1);
          brokenSprings = brokenSprings.slice(1);
          continue;
        }

        springConditions = springConditions.slice(brokenSprings[0]);
        brokenSprings = brokenSprings.slice(1);
        continue;
      }

      throw 'invalid input';
    }
  }
}
