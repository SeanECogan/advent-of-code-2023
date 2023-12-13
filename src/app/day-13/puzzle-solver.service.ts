import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PuzzleSolverService {

  constructor() { }

  public SolvePuzzleA(input: string): number {
    const inputLines = input.split(/\r?\n|\r|\n/g);

    let currentMap: string[] = [];

    let summary = 0;

    inputLines.map((il) => {
      if (il.trim() != '') {
        currentMap.push(il);
      } else {
        summary += this.FindLineOfReflectionValue(currentMap);

        currentMap = [];
      }
    });

    summary += this.FindLineOfReflectionValue(currentMap);

    return summary;
  }

  public SolvePuzzleB(input: string): number {
    const inputLines = input.split(/\r?\n|\r|\n/g);

    let currentMap: string[] = [];

    let summary = 0;

    inputLines.map((il) => {
      if (il.trim() != '') {
        currentMap.push(il);
      } else {
        summary += this.FindUpdatedLineOfReflectionValue(currentMap);

        currentMap = [];
      }
    });

    summary += this.FindUpdatedLineOfReflectionValue(currentMap);

    return summary;
  }

  private FindLineOfReflectionValue(map: string[]): number {
    return this.FindVerticalLineOfReflectionValue(map, null) + this.FindHorizontalLineOfReflectionValue(map, null);
  }

  private FindVerticalLineOfReflectionValue(map: string[], originalValue: number | null): number {
    const startIndex = Math.floor(map[0].length / 2);

    for (let i = 0; i <= startIndex; i++) {
      for (let j = -1; j < 2; j += 2) {
        const initialLeftIndex = startIndex + (i * j);
        const initialRightIndex = initialLeftIndex + 1;

        let initialIndexOffset = 0;

        let isVerticalReflection = true;

        if (initialLeftIndex - initialIndexOffset >= 0 &&
          initialRightIndex + initialIndexOffset < map[0].length) {
          while (initialLeftIndex - initialIndexOffset >= 0 &&
            initialRightIndex + initialIndexOffset < map[0].length) {

            if (!this.VerticalLinesReflect(initialLeftIndex - initialIndexOffset, initialRightIndex + initialIndexOffset, map)) {
              isVerticalReflection = false;
              break;
            }

            initialIndexOffset++;
          }
        }
        else {
          isVerticalReflection = false;
        }

        if (isVerticalReflection) {
          if (originalValue != null) {
            if ((initialLeftIndex + 1) == originalValue) {
              continue;
            } else {
              return initialLeftIndex + 1;
            }
          } else {
            return initialLeftIndex + 1;
          }
        }
      }
    }

    return 0;
  }

  private VerticalLinesReflect(leftIndex: number, rightIndex: number, map: string[]): boolean {
    let verticalLinesReflect = true;

    for (let y = 0; y < map.length; y++) {
      if (map[y].charAt(leftIndex) != map[y].charAt(rightIndex)) {
        verticalLinesReflect = false;
        break;
      }
    }

    return verticalLinesReflect;
  }

  private FindHorizontalLineOfReflectionValue(map: string[], originalValue: number | null): number {
    const startIndex = Math.floor(map.length / 2);

    for (let i = 0; i <= startIndex; i++) {
      for (let j = -1; j < 2; j += 2) {
        const initialTopIndex = startIndex + (i * j);
        const initialBottomIndex = initialTopIndex + 1;

        let initialIndexOffset = 0;

        let isHorizontalReflection = true;

        if ((initialTopIndex - initialIndexOffset >= 0 &&
          initialBottomIndex + initialIndexOffset < map.length)) {
          while (initialTopIndex - initialIndexOffset >= 0 &&
            initialBottomIndex + initialIndexOffset < map.length) {

            if (!this.HorizontalLinesReflect(initialTopIndex - initialIndexOffset, initialBottomIndex + initialIndexOffset, map)) {
              isHorizontalReflection = false;
              break;
            }

            initialIndexOffset++;
          }
        }
        else {
          isHorizontalReflection = false;
        }

        if (isHorizontalReflection) {
          if (originalValue != null) {
            if ((initialTopIndex + 1) * 100 == originalValue) {
              continue;
            } else {
              return (initialTopIndex + 1) * 100
            }
          } else {
            return (initialTopIndex + 1) * 100;
          }
        }
      }
    }

    return 0;
  }

  private HorizontalLinesReflect(topIndex: number, bottomIndex: number, map: string[]): boolean {
    let verticalLinesReflect = true;

    for (let x = 0; x < map[topIndex].length; x++) {
      if (map[topIndex].charAt(x) != map[bottomIndex].charAt(x)) {
        verticalLinesReflect = false;
        break;
      }
    }

    return verticalLinesReflect;
  }

  private FindUpdatedLineOfReflectionValue(map: string[]): number {
    const originalHorizontalLine = this.FindHorizontalLineOfReflectionValue(map, null);
    const originalVerticalLine = this.FindVerticalLineOfReflectionValue(map, null);

    let updatedMap = [];
    let newReflectionFound = false;

    for (let y = 0; y < map.length; y++) {
      if (!newReflectionFound) {
        for (let x = 0; x < map[y].length; x++) {
          updatedMap = [];
          map.map(r => updatedMap.push(r));
          updatedMap[y] = map[y].slice(0, x) + (map[y][x] == '.' ? '#' : '.') + map[y].slice(x + 1);

          const updatedHorizontalLine = this.FindHorizontalLineOfReflectionValue(updatedMap, originalHorizontalLine);
          const updatedVerticalLine = this.FindVerticalLineOfReflectionValue(updatedMap, originalVerticalLine);

          if (updatedHorizontalLine != 0 && updatedHorizontalLine != originalHorizontalLine) {
            return updatedHorizontalLine;
          }

          if (updatedVerticalLine != 0 && updatedVerticalLine != originalVerticalLine) {
            return updatedVerticalLine;
          }
        }
      }
    }

    return 0;
  }
}
