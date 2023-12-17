import { Injectable } from '@angular/core';

class Beam {
  x: number;
  y: number;
  direction: string;
  active: boolean;

  constructor(
    x: number,
    y: number,
    direction: string
  ) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.active = true;
  }
}

class BeamRecord {
  x: number;
  y: number;
  direction: string;

  constructor(
    x: number,
    y: number,
    direction: string
  ) {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }
}

class EnergizedTile {
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

    const beams: Beam[] = [new Beam(
      0,
      0,
      'r'
    )];

    const beamRecords: BeamRecord[] = [];
    const energizedTiles: EnergizedTile[] = [];

    while (beams.filter(b => b.active).length > 0) {
      beams.filter(b => b.active).map(b => this.AdvanceBeam(b, beams, beamRecords, inputLines, energizedTiles));
    }

    return energizedTiles.length;
  }

  public SolvePuzzleB(input: string): number {
    const inputLines = input.split(/\r?\n|\r|\n/g);

    let mostEnergizedTiles = 0;

    for (let i = 0; i < inputLines[0].length; i++) {
      let beams: Beam[] = [new Beam(
        i,
        0,
        'd'
      )];
      let beamRecords: BeamRecord[] = [];
      let energizedTiles: EnergizedTile[] = [];
  
      while (beams.filter(b => b.active).length > 0) {
        beams.filter(b => b.active).map(b => this.AdvanceBeam(b, beams, beamRecords, inputLines, energizedTiles));
      }

      if (energizedTiles.length > mostEnergizedTiles) {
        mostEnergizedTiles = energizedTiles.length;
      }

      beams = [new Beam(
        i,
        inputLines.length - 1,
        'u'
      )];
      beamRecords = [];
      energizedTiles = [];
  
      while (beams.filter(b => b.active).length > 0) {
        beams.filter(b => b.active).map(b => this.AdvanceBeam(b, beams, beamRecords, inputLines, energizedTiles));
      }

      if (energizedTiles.length > mostEnergizedTiles) {
        mostEnergizedTiles = energizedTiles.length;
      }

      console.log('Completed ' + (i + 1) + ' columns along top/bottom out of ' + inputLines[0].length + '. (' + Math.round(((i + 1) / (inputLines[0].length)) * 100) + '% complete.)');
    }

    for (let i = 0; i < inputLines.length; i++) {
      let beams: Beam[] = [new Beam(
        0,
        i,
        'r'
      )];
      let beamRecords: BeamRecord[] = [];
      let energizedTiles: EnergizedTile[] = [];
  
      while (beams.filter(b => b.active).length > 0) {
        beams.filter(b => b.active).map(b => this.AdvanceBeam(b, beams, beamRecords, inputLines, energizedTiles));
      }

      if (energizedTiles.length > mostEnergizedTiles) {
        mostEnergizedTiles = energizedTiles.length;
      }

      beams = [new Beam(
        inputLines[i].length - 1,
        i,
        'l'
      )];
      beamRecords = [];
      energizedTiles = [];
  
      while (beams.filter(b => b.active).length > 0) {
        beams.filter(b => b.active).map(b => this.AdvanceBeam(b, beams, beamRecords, inputLines, energizedTiles));
      }

      if (energizedTiles.length > mostEnergizedTiles) {
        mostEnergizedTiles = energizedTiles.length;
      }

      console.log('Completed ' + (i + 1) + ' rows along left/right out of ' + inputLines.length + '. (' + Math.round(((i + 1) / (inputLines.length)) * 100) + '% complete.)');
    }

    return mostEnergizedTiles;
  }

  private AdvanceBeam(
    beam: Beam,
    beams: Beam[],
    beamRecordMap: BeamRecord[],
    mirrorMap: string[],
    energizedTiles: EnergizedTile[]) {
    if (energizedTiles.filter((et) => {
      return et.x == beam.x && et.y == beam.y;
    }).length == 0) {
      energizedTiles.push(new EnergizedTile(beam.x, beam.y));
    }

    if (beamRecordMap.filter((brm) => {
      return brm.x == beam.x &&
             brm.y == beam.y &&
             brm.direction == beam.direction;
    }).length > 0) {
      beam.active = false;
    } else {
      beamRecordMap.push(new BeamRecord(
        beam.x,
        beam.y,
        beam.direction
      ));

      switch (mirrorMap[beam.y][beam.x]) {
        case '\\':
          switch (beam.direction) {
            case 'r':
              beam.direction = 'd';
              break;

            case 'l':
              beam.direction = 'u';
              break;

            case 'u':
              beam.direction = 'l';
              break;

            case 'd':
              beam.direction = 'r';
              break;

            default:
              break;
          }
          break;

        case '/':
          switch (beam.direction) {
            case 'r':
              beam.direction = 'u';
              break;

            case 'l':
              beam.direction = 'd';
              break;

            case 'u':
              beam.direction = 'r';
              break;

            case 'd':
              beam.direction = 'l';
              break;

            default:
              break;
          }
          break;

        case '-':
          switch (beam.direction) {
            case 'r':
            case 'l':
              break;

            case 'u':
            case 'd':
              beam.direction = 'l';
              beams.push(new Beam(
                beam.x,
                beam.y,
                'r'
              ));
              break;

            default:
              break;
          }
          break;

        case '|':
          switch (beam.direction) {
            case 'r':
            case 'l':
              beam.direction = 'u';
              beams.push(new Beam(
                beam.x,
                beam.y,
                'd'
              ));
              break;

            case 'u':
            case 'd':
              break;

            default:
              break;
          }
          break;

        case '.':
        default:
          break;
      }

      switch (beam.direction) {
        case 'r':
          if (beam.x < (mirrorMap[beam.y].length - 1)) {
            beam.x++;
          } else {
            beam.active = false;
          }
          break;

        case 'l':
          if (beam.x > 0) {
            beam.x--;
          } else {
            beam.active = false;
          }
          break;

        case 'u':
          if (beam.y > 0) {
            beam.y--;
          } else {
            beam.active = false;
          }
          break;

        case 'd':
          if (beam.y < (mirrorMap.length - 1)) {
            beam.y++;
          } else {
            beam.active = false;
          }
          break;

        default:
          break;
      }
    }
  }
}
