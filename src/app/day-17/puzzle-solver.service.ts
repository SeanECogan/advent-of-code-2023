import { Injectable } from '@angular/core';

class PriorityQueue<State> {
  data: [number, State][];

  constructor() {
    this.data = [];
  }

  push(item: State, priority: number) {
    if (this.data.length == 0) {
      this.data.push([priority, item]);
      return;
    }

    for (let i = 0; i < this.data.length; i++) {
      if (i == this.data.length - 1) {
        this.data.push([priority, item]);
        return;
      }

      if (this.data[i][0] > priority) {
        this.data.splice(i, 0, [priority, item]);
        return;
      }
    }
  }

  pop() {
    return this.data.length == 0 ? null : this.data.shift()![1];
  }

  isEmpty() {
    return this.data.length <= 0;
  }
}

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

class State {
  position: Position;
  xMovement: number;
  yMovement: number;
  consecutiveSteps: number;
  heatLoss: number;

  constructor(
    position: Position,
    xMovement: number,
    yMovement: number,
    consecutiveSteps: number,
    heatLoss: number
  ) {
    this.position = position;
    this.xMovement = xMovement;
    this.yMovement = yMovement;
    this.consecutiveSteps = consecutiveSteps;
    this.heatLoss = heatLoss;
  }
}

@Injectable({
  providedIn: 'root'
})
export class PuzzleSolverService {

  constructor() { }

  public SolvePuzzleA(input: string): number {
    const inputLines = input.split(/\r?\n|\r|\n/g);

    const grid: number[][] = [];

    inputLines.map((il) => {
      const gridRow: number[] = [];

      il.split('').map(c => gridRow.push(+c));

      grid.push(gridRow);
    });

    const seen: Set<string> = new Set<string>();
    const priorityQueue = new PriorityQueue<State>();
    priorityQueue.push(new State(
      new Position(0, 0),
      0,
      0,
      0,
      0
    ), 0);

    let minimalHeatLoss = 0;

    while (!priorityQueue.isEmpty()) {
      const currentState = priorityQueue.pop();

      if (currentState != null) {
        if (currentState.position.x == grid[0].length - 1 &&
          currentState.position.y == grid.length - 1) {
          minimalHeatLoss = currentState.heatLoss;
          break;
        }

        const serializedState = this.SerializeState(currentState);

        if (seen.has(serializedState)) {
          continue;
        }

        seen.add(serializedState);

        if (currentState.consecutiveSteps < 3 && (currentState.xMovement != 0 || currentState.yMovement != 0)) {
          const nextX = currentState.position.x + currentState.xMovement;
          const nextY = currentState.position.y + currentState.yMovement;

          if ((nextX >= 0 && nextX < grid[0].length) &&
            (nextY >= 0 && nextY < grid.length)) {
            const newState = new State(
              new Position(nextX, nextY),
              currentState.xMovement,
              currentState.yMovement,
              currentState.consecutiveSteps + 1,
              currentState.heatLoss + grid[nextY][nextX]
            );

            priorityQueue.push(newState, newState.heatLoss);
          }
        }

        if (currentState.yMovement != -1 && currentState.yMovement != 1) {
          const downY = currentState.position.y + 1;

          if ((downY < grid.length)) {
            const newState = new State(
              new Position(currentState.position.x, downY),
              0,
              1,
              1,
              currentState.heatLoss + grid[downY][currentState.position.x]
            );

            priorityQueue.push(newState, newState.heatLoss);
          }

          const upY = currentState.position.y - 1;

          if ((upY >= 0)) {
            const newState = new State(
              new Position(currentState.position.x, upY),
              0,
              -1,
              1,
              currentState.heatLoss + grid[upY][currentState.position.x]
            );

            priorityQueue.push(newState, newState.heatLoss);
          }
        }

        if (currentState.xMovement != -1 && currentState.xMovement != 1) {
          const leftX = currentState.position.x - 1;

          if ((leftX >= 0)) {
            const newState = new State(
              new Position(leftX, currentState.position.y),
              -1,
              0,
              1,
              currentState.heatLoss + grid[currentState.position.y][leftX]
            );

            priorityQueue.push(newState, newState.heatLoss);
          }

          const rightX = currentState.position.x + 1;

          if ((rightX < grid[0].length)) {
            const newState = new State(
              new Position(rightX, currentState.position.y),
              1,
              0,
              1,
              currentState.heatLoss + grid[currentState.position.y][rightX]
            );

            priorityQueue.push(newState, newState.heatLoss);
          }
        }
      }
    }

    return minimalHeatLoss;
  }

  public SolvePuzzleB(input: string): number {
    const inputLines = input.split(/\r?\n|\r|\n/g);

    const grid: number[][] = [];

    inputLines.map((il) => {
      const gridRow: number[] = [];

      il.split('').map(c => gridRow.push(+c));

      grid.push(gridRow);
    });

    const seen: Set<string> = new Set<string>();
    const priorityQueue = new PriorityQueue<State>();
    priorityQueue.push(new State(
      new Position(0, 0),
      0,
      0,
      0,
      0
    ), 0);

    let minimalHeatLoss = 0;

    while (!priorityQueue.isEmpty()) {
      const currentState = priorityQueue.pop();

      if (currentState != null) {
        if (currentState.position.x == grid[0].length - 1 &&
          currentState.position.y == grid.length - 1) {
          minimalHeatLoss = currentState.heatLoss;
          break;
        }

        const serializedState = this.SerializeState(currentState);

        if (seen.has(serializedState)) {
          continue;
        }

        seen.add(serializedState);

        if (currentState.consecutiveSteps < 10 && (currentState.xMovement != 0 || currentState.yMovement != 0)) {
          const nextX = currentState.position.x + currentState.xMovement;
          const nextY = currentState.position.y + currentState.yMovement;

          if ((nextX >= 0 && nextX < grid[0].length) &&
            (nextY >= 0 && nextY < grid.length)) {
            const newState = new State(
              new Position(nextX, nextY),
              currentState.xMovement,
              currentState.yMovement,
              currentState.consecutiveSteps + 1,
              currentState.heatLoss + grid[nextY][nextX]
            );

            priorityQueue.push(newState, newState.heatLoss);
          }
        }

        if (currentState.consecutiveSteps >= 4 || (currentState.position.x == 0 && currentState.position.y == 0)) {
          if (currentState.yMovement != -1 && currentState.yMovement != 1) {
            const downY = currentState.position.y + 1;

            if ((downY < grid.length)) {
              const newState = new State(
                new Position(currentState.position.x, downY),
                0,
                1,
                1,
                currentState.heatLoss + grid[downY][currentState.position.x]
              );

              priorityQueue.push(newState, newState.heatLoss);
            }

            const upY = currentState.position.y - 1;

            if ((upY >= 0)) {
              const newState = new State(
                new Position(currentState.position.x, upY),
                0,
                -1,
                1,
                currentState.heatLoss + grid[upY][currentState.position.x]
              );

              priorityQueue.push(newState, newState.heatLoss);
            }
          }

          if (currentState.xMovement != -1 && currentState.xMovement != 1) {
            const leftX = currentState.position.x - 1;

            if ((leftX >= 0)) {
              const newState = new State(
                new Position(leftX, currentState.position.y),
                -1,
                0,
                1,
                currentState.heatLoss + grid[currentState.position.y][leftX]
              );

              priorityQueue.push(newState, newState.heatLoss);
            }

            const rightX = currentState.position.x + 1;

            if ((rightX < grid[0].length)) {
              const newState = new State(
                new Position(rightX, currentState.position.y),
                1,
                0,
                1,
                currentState.heatLoss + grid[currentState.position.y][rightX]
              );

              priorityQueue.push(newState, newState.heatLoss);
            }
          }
        }
      }
    }

    return minimalHeatLoss;
  }

  private SerializeState(state: State): string {
    return `${state.position.x},${state.position.y}|${state.xMovement}|${state.yMovement}|${state.consecutiveSteps}`;
  }
}
