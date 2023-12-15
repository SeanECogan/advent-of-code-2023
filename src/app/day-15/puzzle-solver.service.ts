import { Injectable } from '@angular/core';

class Lens {
  label: string;
  focalLength: number;

  constructor(
    label: string,
    focalLength: number
  ) {
    this.label = label;
    this.focalLength = focalLength;
  }
}

@Injectable({
  providedIn: 'root'
})
export class PuzzleSolverService {

  constructor() { }

  public SolvePuzzleA(input: string): number {
    const inputLines = input.split(/\r?\n|\r|\n/g);
    const steps = inputLines[0].split(',');

    let verificationCode = 0;

    steps.map((step) => {
      verificationCode += this.GetHASHCodeForString(step);
    });

    return verificationCode;
  }

  public SolvePuzzleB(input: string): number {
    const inputLines = input.split(/\r?\n|\r|\n/g);

    const boxes: Map<number, Lens[]> = new Map<number, Lens[]>();

    const steps = inputLines[0].split(',');

    steps.map((step) => {
      if (step.indexOf('-') >= 0) {
        const label = step.slice(0, step.indexOf('-'));
        const boxId = this.GetHASHCodeForString(label);

        if (boxes.has(boxId)) {
          if (boxes.get(boxId)!.filter(boxLens => boxLens.label == label).length > 0) {
            let indexToRemove = -1;

            boxes.get(boxId)!.map((boxLens, index) => {
              if (boxLens.label == label) {
                indexToRemove = index;
              }
            });

            boxes.set(boxId, boxes.get(boxId)!.slice(0, indexToRemove).concat(boxes.get(boxId)!.slice(indexToRemove + 1)));
          }
        }
      } else {
        const lens = this.GetLensFromStep(step);
        const boxId = this.GetHASHCodeForString(lens.label);

        if (boxes.has(boxId)) {
          if (boxes.get(boxId)!.filter(boxLens => boxLens.label == lens.label).length > 0) {
            boxes.get(boxId)!.map((boxLens) => {
              if (boxLens.label == lens.label) {
                boxLens.focalLength = lens.focalLength;
              }
            });
          } else {
            boxes.get(boxId)!.push(lens);
          }
        } else {
          const newBox: Lens[] = [lens];

          boxes.set(boxId, newBox);
        }
      }
    });

    let focusingPower = 0;

    boxes.forEach((boxLenses, boxId) => {
      for (let i = 0; i < boxLenses.length; i++) {
        focusingPower += (boxId + 1) * (i + 1) * boxLenses[i].focalLength;
      }
    });

    return focusingPower;
  }

  private GetHASHCodeForString(stringToHash: string): number {
    let currentValue = 0;

    for (let i = 0; i < stringToHash.length; i++) {
      currentValue += stringToHash.charCodeAt(i);
      currentValue *= 17;
      currentValue %= 256;
    }

    return currentValue;
  }

  private GetLensFromStep(step: string): Lens {
    const lensParts = step.split('=');

    return new Lens(
      lensParts[0],
      +(lensParts[1])
    );
  }
}
