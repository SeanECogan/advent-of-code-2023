import { Injectable } from '@angular/core';

class Pipe {
  x: number;
  y: number;
  char: string;
  northNeighbor: Pipe | null = null;
  eastNeighbor: Pipe | null = null;
  southNeighbor: Pipe | null = null;
  westNeighbor: Pipe | null = null;

  constructor(
    x: number,
    y: number,
    char: string
  ) {
    this.x = x;
    this.y = y;
    this.char = char;
  }
}

@Injectable({
  providedIn: 'root'
})
export class PuzzleSolverService {

  constructor() { }

  public SolvePuzzleA(input: string): number {
    const inputLines = input.split(/\r?\n|\r|\n/g);

    let startX = 0;
    let startY = 0;

    const pipesInLoop: Pipe[] = [];

    for (let i = 0; i < inputLines.length; i++) {
      if (inputLines[i].indexOf('S') >= 0) {
        startX = inputLines[i].indexOf('S');
        startY = i;
        break;
      }
    }

    let startPipe = new Pipe(
      startX,
      startY,
      inputLines[startY][startX]
    );

    this.AssignNeighborsToStartPipe(
      startPipe,
      inputLines);

    pipesInLoop.push(startPipe);

    let nextPipe = null;

    switch (startPipe.char) {
      case '|':
      case 'J':
        nextPipe = startPipe.northNeighbor;
        break;

      case '-':
      case 'L':
        nextPipe = startPipe.eastNeighbor;
        break;

      case '7':
      case 'F':
      default:
        nextPipe = startPipe.southNeighbor;
        break;
    }

    if (nextPipe != null) {
      do {
        if (nextPipe != null) {
          pipesInLoop.push(nextPipe);
          nextPipe = this.AssignNeighborsToNonStartPipe(
            nextPipe,
            inputLines
          );
        }
      } while (nextPipe != null && (startPipe.x != nextPipe.x || startPipe.y != nextPipe.y));
    }

    return pipesInLoop.length / 2;
  }

  public SolvePuzzleB(input: string): number {
    const inputLines = input.split(/\r?\n|\r|\n/g);

    let startX = 0;
    let startY = 0;

    const pipesInLoop: Pipe[] = [];

    for (let i = 0; i < inputLines.length; i++) {
      if (inputLines[i].indexOf('S') >= 0) {
        startX = inputLines[i].indexOf('S');
        startY = i;
        break;
      }
    }

    let startPipe = new Pipe(
      startX,
      startY,
      inputLines[startY][startX]
    );

    this.AssignNeighborsToStartPipe(
      startPipe,
      inputLines);

    pipesInLoop.push(startPipe);

    let nextPipe = null;

    switch (startPipe.char) {
      case '|':
      case 'J':
        nextPipe = startPipe.northNeighbor;
        break;

      case '-':
      case 'L':
        nextPipe = startPipe.eastNeighbor;
        break;

      case '7':
      case 'F':
      default:
        nextPipe = startPipe.southNeighbor;
        break;
    }

    if (nextPipe != null) {
      do {
        if (nextPipe != null) {
          pipesInLoop.push(nextPipe);
          nextPipe = this.AssignNeighborsToNonStartPipe(
            nextPipe,
            inputLines
          );
        }
      } while (nextPipe != null && (startPipe.x != nextPipe.x || startPipe.y != nextPipe.y));
    }

    let insideLoop = false;
    let potentialFFlip = false;
    let potentialLFlip = false;
    let insideLoopCount = 0;

    for (let y = 0; y < inputLines.length; y++) {
      for (let x = 0; x < inputLines[y].length; x++) {
        if (pipesInLoop.filter((pipe) => {
          return pipe.x == x && pipe.y == y;
        }).length == 0) {
          if (insideLoop) {
            insideLoopCount++;
          }
        } else {
          let cellToCheck = inputLines[y][x]
          
          if (cellToCheck == 'S') {
            cellToCheck = startPipe.char;
          }

          if (cellToCheck == '|') {
            insideLoop = !insideLoop;
          } else if (cellToCheck == 'F') {
            potentialFFlip = true;
          } else if (cellToCheck == 'L') {
            potentialLFlip = true;
          } else if (cellToCheck == '7') {
            if (potentialLFlip) {
              insideLoop = !insideLoop;
            }

            potentialFFlip = false;
            potentialLFlip = false;
          } else if (cellToCheck == 'J') {
            if (potentialFFlip) {
              insideLoop = !insideLoop;
            }

            potentialFFlip = false;
            potentialLFlip = false;
          }
        }
      }
    }

    return insideLoopCount;
  }

  private AssignNeighborsToStartPipe(
    pipe: Pipe,
    inputLines: string[]
  ) {
    let northNeighbor: Pipe | null = null;
    let eastNeighbor: Pipe | null = null;
    let southNeighbor: Pipe | null = null;
    let westNeighbor: Pipe | null = null;

    if (pipe.y > 0) {
      const northNeighborChar = inputLines[pipe.y - 1][pipe.x];

      if (northNeighborChar == '|' ||
        northNeighborChar == '7' ||
        northNeighborChar == 'F') {
        northNeighbor = new Pipe(pipe.x, pipe.y - 1, northNeighborChar);
        northNeighbor.southNeighbor = pipe;
      }
    }

    if (pipe.y < inputLines.length - 1) {
      const southNeighborChar = inputLines[pipe.y + 1][pipe.x];

      if (southNeighborChar == '|' ||
        southNeighborChar == 'L' ||
        southNeighborChar == 'J') {
        southNeighbor = new Pipe(pipe.x, pipe.y + 1, southNeighborChar);
        southNeighbor.northNeighbor = pipe;
      }
    }

    if (pipe.x > 0) {
      const westNeighborChar = inputLines[pipe.y][pipe.x - 1];

      if (westNeighborChar == '-' ||
        westNeighborChar == 'L' ||
        westNeighborChar == 'F') {
        westNeighbor = new Pipe(pipe.x - 1, pipe.y, westNeighborChar);
        westNeighbor.eastNeighbor = pipe;
      }
    }

    if (pipe.x < inputLines[pipe.y].length - 1) {
      const eastNeighborChar = inputLines[pipe.y][pipe.x + 1];

      if (eastNeighborChar == '-' ||
        eastNeighborChar == 'J' ||
        eastNeighborChar == '7') {
        eastNeighbor = new Pipe(pipe.x + 1, pipe.y, eastNeighborChar);
        eastNeighbor.westNeighbor = pipe;
      }
    }

    if (northNeighbor != null) {
      pipe.northNeighbor = northNeighbor;
    }

    if (southNeighbor != null) {
      pipe.southNeighbor = southNeighbor;
    }

    if (westNeighbor != null) {
      pipe.westNeighbor = westNeighbor;
    }

    if (eastNeighbor != null) {
      pipe.eastNeighbor = eastNeighbor;
    }

    if (northNeighbor != null && southNeighbor != null) {
      pipe.char = '|';
    }

    if (eastNeighbor != null && westNeighbor != null) {
      pipe.char = '-';
    }

    if (northNeighbor != null && eastNeighbor != null) {
      pipe.char = 'L';
    }

    if (northNeighbor != null && westNeighbor != null) {
      pipe.char = 'J';
    }

    if (southNeighbor != null && westNeighbor != null) {
      pipe.char = '7';
    }

    if (southNeighbor != null && eastNeighbor != null) {
      pipe.char = 'F';
    }
  }

  private AssignNeighborsToNonStartPipe(
    pipe: Pipe,
    inputLines: string[]
  ): Pipe | null {
    switch (pipe.char) {
      case '|':
        if (pipe.northNeighbor == null) {
          const northNeighborChar = inputLines[pipe.y - 1][pipe.x];
          const northNeighbor = new Pipe(pipe.x, pipe.y - 1, northNeighborChar);
          northNeighbor.southNeighbor = pipe;
          return northNeighbor;
        }

        if (pipe.southNeighbor == null) {
          const southNeighborChar = inputLines[pipe.y + 1][pipe.x];
          const southNeighbor = new Pipe(pipe.x, pipe.y + 1, southNeighborChar);
          southNeighbor.northNeighbor = pipe;
          return southNeighbor;
        }

        return null;

      case '-':
        if (pipe.westNeighbor == null) {
          const westNeighborChar = inputLines[pipe.y][pipe.x - 1];
          const westNeighbor = new Pipe(pipe.x - 1, pipe.y, westNeighborChar);
          westNeighbor.eastNeighbor = pipe;
          return westNeighbor;
        }

        if (pipe.eastNeighbor == null) {
          const eastNeighborChar = inputLines[pipe.y][pipe.x + 1];
          const eastNeighbor = new Pipe(pipe.x + 1, pipe.y, eastNeighborChar);
          eastNeighbor.westNeighbor = pipe;
          return eastNeighbor;
        }

        return null;

      case 'L':
        if (pipe.northNeighbor == null) {
          const northNeighborChar = inputLines[pipe.y - 1][pipe.x];
          const northNeighbor = new Pipe(pipe.x, pipe.y - 1, northNeighborChar);
          northNeighbor.southNeighbor = pipe;
          return northNeighbor;
        }

        if (pipe.eastNeighbor == null) {
          const eastNeighborChar = inputLines[pipe.y][pipe.x + 1];
          const eastNeighbor = new Pipe(pipe.x + 1, pipe.y, eastNeighborChar);
          eastNeighbor.westNeighbor = pipe;
          return eastNeighbor;
        }

        return null;

      case 'J':
        if (pipe.northNeighbor == null) {
          const northNeighborChar = inputLines[pipe.y - 1][pipe.x];
          const northNeighbor = new Pipe(pipe.x, pipe.y - 1, northNeighborChar);
          northNeighbor.southNeighbor = pipe;
          return northNeighbor;
        }

        if (pipe.westNeighbor == null) {
          const westNeighborChar = inputLines[pipe.y][pipe.x - 1];
          const westNeighbor = new Pipe(pipe.x - 1, pipe.y, westNeighborChar);
          westNeighbor.eastNeighbor = pipe;
          return westNeighbor;
        }

        return null;

      case '7':
        if (pipe.southNeighbor == null) {
          const southNeighborChar = inputLines[pipe.y + 1][pipe.x];
          const southNeighbor = new Pipe(pipe.x, pipe.y + 1, southNeighborChar);
          southNeighbor.northNeighbor = pipe;
          return southNeighbor;
        }

        if (pipe.westNeighbor == null) {
          const westNeighborChar = inputLines[pipe.y][pipe.x - 1];
          const westNeighbor = new Pipe(pipe.x - 1, pipe.y, westNeighborChar);
          westNeighbor.eastNeighbor = pipe;
          return westNeighbor;
        }

        return null;

      case 'F':
        if (pipe.southNeighbor == null) {
          const southNeighborChar = inputLines[pipe.y + 1][pipe.x];
          const southNeighbor = new Pipe(pipe.x, pipe.y + 1, southNeighborChar);
          southNeighbor.northNeighbor = pipe;
          return southNeighbor;
        }

        if (pipe.eastNeighbor == null) {
          const eastNeighborChar = inputLines[pipe.y][pipe.x + 1];
          const eastNeighbor = new Pipe(pipe.x + 1, pipe.y, eastNeighborChar);
          eastNeighbor.westNeighbor = pipe;
          return eastNeighbor;
        }

        return null;

      default:
        return null;
    }
  }
}
