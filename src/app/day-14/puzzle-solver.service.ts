import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PuzzleSolverService {

  constructor() { }

  public SolvePuzzleA(input: string): number {
    const inputLines = input.split(/\r?\n|\r|\n/g);

    const map: string[] = [];

    let load = 0;

    for (let i = 0; i < inputLines[0].length; i++) {
      map.push('');
    }

    for (let x = 0; x < map.length; x++) {
      for (let y = 0; y < inputLines.length; y++) {
        map[x] += inputLines[y][x];
      }
    }

    map.map((column) => {
      let tiltedRocks = 0;
      let lastCubeRock = 0;

      for (let i = 0; i < column.length; i++) {
        if (column[i] == 'O') {
          let cubeRockIndex = column.slice(lastCubeRock, i).indexOf('#');

          if (cubeRockIndex >= 0) {
            lastCubeRock = lastCubeRock + cubeRockIndex + 1;
            tiltedRocks = 0;
          }

          load += (column.length - (lastCubeRock + tiltedRocks));

          tiltedRocks++;
        }

        if (column[i] == '#') {
          lastCubeRock = i;
        }
      }
    });

    return load;
  }

  public SolvePuzzleB(input: string): number {
    const inputLines = input.split(/\r?\n|\r|\n/g);

    let map: string[][] = [];

    for (let i = 0; i < inputLines[0].length; i++) {
      map.push([]);
    }

    for (let x = 0; x < inputLines[0].length; x++) {
      for (let y = 0; y < inputLines.length; y++) {
        map[y].push(inputLines[y][x]);
      }
    }

    let mapStates: Map<string, number> = new Map<string, number>();
    let cyclesPerformed = 0;

    while (!mapStates.has(this.GetKeyFromMap(map))) {
      mapStates.set(this.GetKeyFromMap(map), cyclesPerformed);

      map = this.SlideAllRocksNorth(map);

      map = this.RotateMapClockwise(map);

      map = this.SlideAllRocksNorth(map);

      map = this.RotateMapClockwise(map);

      map = this.SlideAllRocksNorth(map);

      map = this.RotateMapClockwise(map);

      map = this.SlideAllRocksNorth(map);

      map = this.RotateMapClockwise(map);

      cyclesPerformed++;
    }

    const cycleOffset = mapStates.get(this.GetKeyFromMap(map))!;
    const cycleLength = cyclesPerformed - cycleOffset;

    const cyclesToPerform = (1000000000 - cyclesPerformed) % cycleLength;

    for (let i = 0; i < cyclesToPerform; i++) {
      map = this.SlideAllRocksNorth(map);

      map = this.RotateMapClockwise(map);

      map = this.SlideAllRocksNorth(map);

      map = this.RotateMapClockwise(map);

      map = this.SlideAllRocksNorth(map);

      map = this.RotateMapClockwise(map);

      map = this.SlideAllRocksNorth(map);

      map = this.RotateMapClockwise(map);
    }

    return this.CalculateLoadForMap(map);
  }

  private SlideAllRocksNorth(map: string[][]): string[][] {
    const newMap: string[][] = [];

    map.map(m => newMap.push([]));

    for (let i = 0; i < map[0].length; i++) {
      const column: string[] = [];

      for (let j = 0; j < map.length; j++) {
        column.push(map[j][i]);
      }

      const slidColumn = this.SlideRocksNorthForColumn(column);

      for (let j = 0; j < map.length; j++) {
        newMap[j][i] = slidColumn[j];
      }
    }

    return newMap;
  }

  private SlideRocksNorthForColumn(column: string[]): string[] {
    const joinedColumn = column.join('');

    const columnParts = joinedColumn.split('#');

    return columnParts.map((part) => {
      return part.split('').sort().reverse().join('');
    }).join('#').split('');
  }

  private RotateMapClockwise(map: string[][]): string[][] {
    const n = map.length;
    const x = Math.floor(n / 2);
    const y = n - 1;
    for (let i = 0; i < x; i++) {
      for (let j = i; j < y - i; j++) {
        let k = map[i][j];
        map[i][j] = map[y - j][i];
        map[y - j][i] = map[y - i][y - j];
        map[y - i][y - j] = map[j][y - i];
        map[j][y - i] = k;
      }
    }

    return map;
  }

  private GetKeyFromMap(map: string[][]): string {
    return map.map(x => x.join('')).join('|');
  }

  private CalculateLoadForMap(map: string[][]): number {
    let load = 0;

    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        if (map[y][x] == 'O') {
          load += map.length - y;
        }
      }
    }

    return load;
  }
}
