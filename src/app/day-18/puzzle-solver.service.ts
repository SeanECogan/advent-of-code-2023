import { Injectable } from '@angular/core';

class Position {
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

class TrenchWall {
  position: Position;
  color: string;

  constructor(
    position: Position,
    color: string
  ) {
    this.position = position;
    this.color = color;
  }
}

@Injectable({
  providedIn: 'root'
})
export class PuzzleSolverService {

  constructor() { }

  public SolvePuzzleA(input: string): number {
    const inputLines = input.split(/\r?\n|\r|\n/g);
    
    const trenchWalls: TrenchWall[] = [];

    const currentPosition: Position = new Position(0, 0);

    inputLines.map((il) => {
      const lineParts = il.split(/\s+/);

      const direction = lineParts[0];
      const length = +(lineParts[1]);
      const color = lineParts[2].replace('(','').replace(')','');

      for (let i = 0; i < length; i++) {
        switch (direction) {
          case 'R':
            currentPosition.x++;
            break;

          case 'L':
            currentPosition.x--;
            break;

          case 'U':
            currentPosition.y--;
            break;

          case 'D':
            currentPosition.y++;
            break;

          default:
            break;
        }

        trenchWalls.push(new TrenchWall(
          new Position(
            currentPosition.x,
            currentPosition.y
          ),
          color
        ));
      }
    });

    const allTrenchPositions = this.FindAllTrenchPositions(trenchWalls);

    return trenchWalls.length + allTrenchPositions.length;
  }

  public SolvePuzzleB(input: string): number {
    const inputLines = input.split(/\r?\n|\r|\n/g); 

    const currentPosition: Position = new Position(0, 0);
    const corners: Position[] = [];

    let perimeter = 0;
    
    inputLines.map((il) => {
      const lineParts = il.split(/\s+/);

      const instructionsHexString = lineParts[2].replace('(','').replace(')','').replace('#','');

      let xDirection = 0;
      let yDirection = 0;

      switch (instructionsHexString.charAt(instructionsHexString.length - 1)) {
        case '0':
          xDirection = 1;
          yDirection = 0;
          break;

        case '1':
          xDirection = 0;
          yDirection = 1;
          break;

        case '2':
          xDirection = -1;
          yDirection = 0;
          break;

        case '3':
          xDirection = 0;
          yDirection = -1;
          break;
      }

      const distance = parseInt(instructionsHexString.slice(0, instructionsHexString.length - 1), 16);

      currentPosition.x += (distance * xDirection);
      currentPosition.y += (distance * yDirection);

      perimeter += distance;

      corners.push(new Position(currentPosition.x, currentPosition.y));
    });

    let area = 0;

    for (let i = 0; i < corners.length - 1; i++) {
      area += (corners[i].x - corners[i + 1].x) * (corners[i].y + corners[i + 1].y);
    }

    return ((area + perimeter) / 2) + 1;
  }

  private FindAllTrenchPositions(trenchWalls: TrenchWall[]): Position[] {
    const xPositions = trenchWalls.map(tw => tw.position.x);
    const xMin = Math.min(...xPositions);
    const xMax = Math.max(...xPositions);

    const yPositions = trenchWalls.map(tw => tw.position.y);
    const yMin = Math.min(...yPositions);
    const yMax = Math.max(...yPositions);

    const startPosition = new Position(Math.floor(xMin + ((xMax - xMin) / 2)), Math.floor(yMin + ((yMax - yMin) / 2)));

    const positionsToCheck: Position[] = [startPosition];
    const positionsSeen: Set<string> = new Set<string>();

    const positionsInTrench: Position[] = [];

    while (positionsToCheck.length > 0) {
      const currentPosition = positionsToCheck.pop();
      
      if (currentPosition != null && currentPosition != undefined) {
        const currentPositionString = this.SerializePosition(currentPosition);

        if (positionsSeen.has(currentPositionString)) {
          continue;
        }

        positionsSeen.add(currentPositionString);
        positionsInTrench.push(currentPosition);

        const upNeighbor = new Position(currentPosition.x, currentPosition.y - 1);
        const downNeighbor = new Position(currentPosition.x, currentPosition.y + 1);
        const leftNeighbor = new Position(currentPosition.x - 1, currentPosition.y);
        const rightNeighbor = new Position(currentPosition.x + 1, currentPosition.y);

        const neighbors: Position[] = [upNeighbor, downNeighbor, leftNeighbor, rightNeighbor];

        neighbors.map((neighbor) => {
          if (!this.PositionIsInTrenchWalls(neighbor, trenchWalls)) {
            positionsToCheck.push(neighbor);
          }
        });
      }
      else {
        break;
      }      
    }

    return positionsInTrench;
  }

  private SerializePosition(position: Position): string {
    return `${position.x},${position.y}`;
  }

  private PositionIsInTrenchWalls(position: Position, trenchWalls: TrenchWall[]): boolean {
    return trenchWalls.filter(tw => tw.position.x == position.x && tw.position.y == position.y).length > 0;
  }
}
