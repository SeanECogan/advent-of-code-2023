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

    let steps = 0;
    let directions = '';

    let map: any = {};

    inputLines.map((il) => {
      if (il.trim() == '') {
        return;
      } else if (il.indexOf('=') >= 0) {
        const node = this.ParseNodeFromInputLine(il);

        map[node.id] = node;
      } else {
        directions = il;
      }
    });

    let currentNode = 'AAA';

    while (currentNode != 'ZZZ') {
      const nextDirection = directions[steps % directions.length];

      steps++;

      if (nextDirection == 'R') {
        currentNode = map[currentNode].right;
      } else {
        currentNode = map[currentNode].left;
      }
    }

    return steps;
  }

  public SolvePuzzleB(input: string): number {
    const inputLines = input.split(/\r?\n|\r|\n/g);
    let directions = '';

    let map: any = {};

    inputLines.map((il) => {
      if (il.trim() == '') {
        return;
      } else if (il.indexOf('=') >= 0) {
        const node = this.ParseNodeFromInputLine(il);

        map[node.id] = node;
      } else {
        directions = il;
      }
    });

    let currentNodes = Object.getOwnPropertyNames(map).filter(nodeId => this.NodeEndsWithCharacter(nodeId, 'A'));

    const pathLoops: number[] = [];

    currentNodes.map((currentNode) => {
      let pathSteps = 0;

      do {
        const nextDirection = directions[pathSteps % directions.length];
  
        pathSteps++;
  
        if (nextDirection == 'R') {
          currentNode = map[currentNode].right;
        } else {
          currentNode = map[currentNode].left;
        }
      } while (!this.NodeEndsWithCharacter(currentNode, 'Z'));

      pathLoops.push(pathSteps);
    });

    const minLoop = Math.min(...pathLoops);
    let multiple = minLoop;

    pathLoops.map((pathLoop) => {
      multiple = this.FindLeastCommonMultiple(multiple, pathLoop);
    });

    return multiple;
  }

  private ParseNodeFromInputLine(inputLine: string): Node {
    const lineParts = inputLine.replace('(', '').replace(')', '').split('=').map(part => part.trim());

    const id = lineParts[0];
    const directionParts = lineParts[1].split(',').map(part => part.trim());

    const left = directionParts[0];
    const right = directionParts[1];

    return new Node(
      id,
      left,
      right
    );
  }

  private NodeEndsWithCharacter(nodeId: string, character: string) {
    return nodeId[nodeId.length - 1] == character;
  }

  private FindLeastCommonMultiple(a: number, b: number): number {
    return (a * b) / this.FindGreatestCommonDenominator(a, b);   
  }

  private FindGreatestCommonDenominator(a: number, b: number): number {
    return !b ? a : this.FindGreatestCommonDenominator(b, a % b);
  }
}
