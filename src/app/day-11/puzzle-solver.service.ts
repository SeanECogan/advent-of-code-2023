import { Injectable } from '@angular/core';

class Galaxy {
  x: number;
  y: number;

  constructor(
    x: number,
    y: number
  ) {
    this.x = x;
    this.y = y;
  }
}

@Injectable({
  providedIn: 'root'
})
export class PuzzleSolverService {

  constructor() { }

  public SolvePuzzleA(input: string): number {
    const inputLines = input.split(/\r?\n|\r|\n/g);

    let distanceTotal = 0;

    const galaxies: Galaxy[] = [];

    const map: string[] = [];

    for (let i = 0; i < inputLines.length; i++) {
      if (inputLines[i].indexOf('#') < 0) {
        map.push(inputLines[i]);
      }

      map.push(inputLines[i]);
    }

    let columnsInserted = 0;

    for (let j = 0; j < inputLines[0].length; j++) {
      let columnIsEmpty = true;
      
      for (let i = 0; i < inputLines.length; i++) {
        if (inputLines[i][j] == '#') {
          columnIsEmpty = false;
          break;
        }
      }

      if (columnIsEmpty) {
        for (let i = 0; i < map.length; i++) {
          map[i] = map[i].slice(0, j + columnsInserted) + '.' + map[i].slice(j + columnsInserted);
        }

        columnsInserted++;
      }
    }
    
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        if (map[y][x] == '#') {
          galaxies.push(new Galaxy(
            x,
            y
          ));
        }
      }
    }

    galaxies.map((galaxy) => {
      const otherGalaxies = galaxies.filter((otherGalaxy) => {
        return otherGalaxy.x != galaxy.x || otherGalaxy.y != galaxy.y
      });

      otherGalaxies.map((otherGalaxy) => {
        const xDistance = Math.abs(galaxy.x - otherGalaxy.x);
        const yDistance = Math.abs(galaxy.y - otherGalaxy.y);

        distanceTotal += xDistance + yDistance;
      });
    });

    return distanceTotal / 2;
  }

  public SolvePuzzleB(input: string): number {
    const inputLines = input.split(/\r?\n|\r|\n/g);

    let distanceTotal = 0;

    const galaxies: Galaxy[] = [];

    const emptyRows: number[] = [];
    const emptyColumns: number[] = [];

    for (let i = 0; i < inputLines.length; i++) {
      if (inputLines[i].indexOf('#') < 0) {
        emptyRows.push(i);
      }
    }

    for (let j = 0; j < inputLines[0].length; j++) {
      let columnIsEmpty = true;
      
      for (let i = 0; i < inputLines.length; i++) {
        if (inputLines[i][j] == '#') {
          columnIsEmpty = false;
          break;
        }
      }

      if (columnIsEmpty) {
        emptyColumns.push(j);
      }
    }
    
    for (let y = 0; y < inputLines.length; y++) {
      for (let x = 0; x < inputLines[y].length; x++) {
        if (inputLines[y][x] == '#') {
          galaxies.push(new Galaxy(
            x,
            y
          ));
        }
      }
    }

    galaxies.map((galaxy) => {
      const otherGalaxies = galaxies.filter((otherGalaxy) => {
        return otherGalaxy.x != galaxy.x || otherGalaxy.y != galaxy.y
      });

      otherGalaxies.map((otherGalaxy) => {
        let xDistance = Math.abs(galaxy.x - otherGalaxy.x);

        emptyColumns.map((ec) => {
          if (galaxy.x > otherGalaxy.x) {
            if (ec > otherGalaxy.x && ec < galaxy.x) {
              xDistance += 999999;
            }
          } else {
            if (ec > galaxy.x && ec < otherGalaxy.x) {
              xDistance += 999999;
            }
          }
        });

        let yDistance = Math.abs(galaxy.y - otherGalaxy.y);  
        
        emptyRows.map((er) => {
          if (galaxy.y > otherGalaxy.y) {
            if (er > otherGalaxy.y && er < galaxy.y) {
              yDistance += 999999;
            }
          } else {
            if (er > galaxy.y && er < otherGalaxy.y) {
              yDistance += 999999;
            }
          }
        });

        distanceTotal += xDistance + yDistance;
      });
    });

    return distanceTotal / 2;
  }
}
