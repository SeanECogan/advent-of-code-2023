import { Injectable } from '@angular/core';

class Race {
  time: number;
  distance: number;

  constructor (
    time: number,
    distance: number
  ) {
    this.time = time;
    this.distance = distance;
  }
}

@Injectable({
  providedIn: 'root'
})
export class PuzzleSolverService {

  constructor() { }

  public SolvePuzzleA(input: string): number {
    const inputLines = input.split(/\r?\n|\r|\n/g);

    let answer = 1;

    const timeParts = inputLines[0].split(':')[1].trim();
    const times = timeParts.split(/\s+/).map((timePart) => {
      return +(timePart.trim());
    });

    const distanceParts = inputLines[1].split(':')[1].trim();
    const distances = distanceParts.split(/\s+/).map((distancePart) => {
      return +(distancePart.trim());
    });

    const races: Race[] = [];

    for (let i = 0; i < times.length; i++) {
      races.push(new Race(
        times[i],
        distances[i]
      ));
    }

    races.map((race) => {
      let optionsToBeatRecord = 0;

      for (let i = 0; i <= race.time; i++) {
        const speed = i;
        const remainingTime = race.time - i;

        if (speed * remainingTime > race.distance) {
          optionsToBeatRecord++;
        }
      }

      answer *= optionsToBeatRecord;
    });

    return answer;
  }

  public SolvePuzzleB(input: string): number {
    const inputLines = input.split(/\r?\n|\r|\n/g);

    let answer = 1;

    const timeParts = inputLines[0].split(':')[1].trim();
    const time = +(timeParts.replaceAll(/\s+/g, ''));

    const distanceParts = inputLines[1].split(':')[1].trim();
    const distance = +(distanceParts.replaceAll(/\s+/g, ''));

    const race = new Race(
      time,
      distance
    );

    let optionsToBeatRecord = 0;

    for (let i = 0; i <= race.time; i++) {
      const speed = i;
      const remainingTime = race.time - i;

      if (speed * remainingTime > race.distance) {
        optionsToBeatRecord++;
      }
    }

    answer *= optionsToBeatRecord;

    return answer;
  }
}
