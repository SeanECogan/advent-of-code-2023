import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PuzzleSolverService {

  private readonly _charCodeZero: number = "0".charCodeAt(0);
  private readonly _charCodeNine: number = "9".charCodeAt(0);

  constructor() { }

  public SolvePuzzleA(input: string): number {
    const inputLines = input.split(/\r?\n|\r|\n/g);

    let calibrationValue = 0;

    for (let y = 0; y < inputLines.length; y++) {
      const currentLine = inputLines[y];

      for (let x = 0; x < currentLine.length; x++) {
        if (this.CharacterIsDigit(currentLine.charCodeAt(x))) {
          const potentialPartNumber = this.GetFullNumericString(
            currentLine,
            x
          );

          const startCharacterIndex = x - 1 < 0 ? x : x - 1;
          const endCharacterIndex = x + potentialPartNumber.length > (currentLine.length - 1) ? x : x + potentialPartNumber.length;

          if (this.PreviousLineContainsAdjacentSymbol(
            inputLines,
            y,
            startCharacterIndex,
            endCharacterIndex
          ) || this.CurrentLineContainsAdjacentSymbol(
            inputLines,
            y,
            startCharacterIndex,
            endCharacterIndex
          ) || this.NextLineContainsAdjacentSymbol(
            inputLines,
            y,
            startCharacterIndex,
            endCharacterIndex
          )) {
            calibrationValue += +(potentialPartNumber);
          }
          
          x += potentialPartNumber.length - 1;
        }
      }
    }

    return calibrationValue;
  }

  public SolvePuzzleB(input: string): number {
    const inputLines = input.split(/\r?\n|\r|\n/g);

    let calibrationValue = 0;

    for (let y = 0; y < inputLines.length; y++) {
      const currentLine = inputLines[y];

      for (let x = 0; x < currentLine.length; x++) {
        if (this.CharacterIsStar(currentLine.charAt(x))) {
          let adjacentPartNumbers: number[] = [];

          const potentialLeftAdjacentPartNumber = this.ParseLeftAdjacentPartNumber(
            currentLine,
            x
          );

          if (potentialLeftAdjacentPartNumber != null) {
            adjacentPartNumbers.push(+potentialLeftAdjacentPartNumber)
          }

          if (y > 0) {
            const startIndex = x > 0 ? x - 1 : x;
            const endIndex = x < inputLines[y - 1].length ? x + 1 : x;

            const topAdjacentPartNumbers = this.ParseTopOrBottomAdjacentPartNumbers(
              inputLines[y - 1],
              startIndex,
              endIndex
            );

            if (topAdjacentPartNumbers.length > 0) {
              topAdjacentPartNumbers.map((pn) => {
                adjacentPartNumbers.push(+(pn));
              });
            }
          }

          const potentialRightAdjacentPartNumber = this.ParseRightAdjacentPartNumber(
            currentLine,
            x
          );

          if (potentialRightAdjacentPartNumber != null) {
            adjacentPartNumbers.push(+potentialRightAdjacentPartNumber)
          }

          if (y < (inputLines.length - 1)) {
            if (y > 0) {
              const startIndex = x > 0 ? x - 1 : x;
              const endIndex = x < inputLines[y + 1].length ? x + 1 : x;
  
              const bottomAdjacentPartNumbers = this.ParseTopOrBottomAdjacentPartNumbers(
                inputLines[y + 1],
                startIndex,
                endIndex
              );
  
              if (bottomAdjacentPartNumbers.length > 0) {
                bottomAdjacentPartNumbers.map((pn) => {
                  adjacentPartNumbers.push(+(pn));
                });
              }
            }
          }

          if (adjacentPartNumbers.length == 2) {
            calibrationValue += adjacentPartNumbers[0] * adjacentPartNumbers[1];
          }
        }
      }
    }

    return calibrationValue;
  }

  private CharacterIsDigit(characterCode: number): boolean {
    return (characterCode >= this._charCodeZero && characterCode <= this._charCodeNine);
  }

  private CharacterIsPeriod(character: string): boolean {
    return character == '.';
  }

  private CharacterIsStar(character: string): boolean {
    return character == '*';
  }

  private GetFullNumericString(
    currentLine: string,
    startIndex: number
  ): string {
    let numericString = '';
    let l = 0;

    while ((startIndex + l) <= (currentLine.length - 1) &&
      this.CharacterIsDigit(currentLine.charCodeAt(startIndex + l))) {
      numericString += currentLine.charAt(startIndex + l);
      l++;
    }

    return numericString;
  }

  private GetFullNumericStringInReverse(
    currentLine: string,
    startIndex: number
  ): string {
    let numericString = '';
    let l = 0;

    while ((startIndex - l) >= 0 &&
      this.CharacterIsDigit(currentLine.charCodeAt(startIndex - l))) {
      numericString = currentLine.charAt(startIndex - l) + numericString;
      l++;
    }

    return numericString;
  }

  private PreviousLineContainsAdjacentSymbol(
    inputLines: string[],
    currentLineIndex: number,
    startCharacterIndex: number,
    endCharacterIndex: number
  ): boolean {
    let previousLineContainsAdjacentSymbol = false;

    if (currentLineIndex - 1 >= 0) {
      for (let x = startCharacterIndex; x <= endCharacterIndex; x++) {
        if (!this.CharacterIsPeriod(inputLines[currentLineIndex - 1].charAt(x)) &&
            !this.CharacterIsDigit(inputLines[currentLineIndex - 1].charCodeAt(x))) {
          previousLineContainsAdjacentSymbol = true;
          break;
        }
      }
    }

    return previousLineContainsAdjacentSymbol;
  }

  private CurrentLineContainsAdjacentSymbol(
    inputLines: string[],
    currentLineIndex: number,
    startCharacterIndex: number,
    endCharacterIndex: number
  ): boolean {
    let currentLineContainsAdjacentSymbol = false;

    if (!this.CharacterIsPeriod(inputLines[currentLineIndex].charAt(startCharacterIndex)) &&
        !this.CharacterIsDigit(inputLines[currentLineIndex].charCodeAt(startCharacterIndex))) {
      currentLineContainsAdjacentSymbol = true;
    }

    if (!this.CharacterIsPeriod(inputLines[currentLineIndex].charAt(endCharacterIndex)) &&
        !this.CharacterIsDigit(inputLines[currentLineIndex].charCodeAt(endCharacterIndex))) {
      currentLineContainsAdjacentSymbol = true;
    }

    return currentLineContainsAdjacentSymbol;
  }

  private NextLineContainsAdjacentSymbol(
    inputLines: string[],
    currentLineIndex: number,
    startCharacterIndex: number,
    endCharacterIndex: number
  ): boolean {
    let nextLineContainsAdjacentSymbol = false;

    if ((currentLineIndex + 1) <= (inputLines.length - 1)) {
      for (let x = startCharacterIndex; x <= endCharacterIndex; x++) {
        if (!this.CharacterIsPeriod(inputLines[currentLineIndex + 1].charAt(x)) &&
            !this.CharacterIsDigit(inputLines[currentLineIndex + 1].charCodeAt(x))) {
          nextLineContainsAdjacentSymbol = true;
          break;
        }
      }
    }

    return nextLineContainsAdjacentSymbol;
  }

  private ParseLeftAdjacentPartNumber(
    currentLine: string,
    startIndex: number
  ): string | null {
    let leftAdjacentPartNumber: string | null = null;

    if (startIndex - 1 >= 0) {
      if (this.CharacterIsDigit(currentLine.charCodeAt(startIndex - 1))) {
        leftAdjacentPartNumber = this.GetFullNumericStringInReverse(
          currentLine,
          startIndex - 1
        );
      }
    }

    return leftAdjacentPartNumber;
  }

  private ParseTopOrBottomAdjacentPartNumbers(
    topOrBottomLine: string,
    startIndex: number,
    endIndex: number
  ) {
    let topAdjacentPartNumbers: string[] = [];
    
    for (let x = startIndex; x <= endIndex; x++) {
      if (this.CharacterIsDigit(topOrBottomLine.charCodeAt(x))) {
        const leftPortion = this.GetFullNumericStringInReverse(
          topOrBottomLine,
          x
        );

        const rightPortion = this.GetFullNumericString(
          topOrBottomLine,
          x
        );

        const partNumber = leftPortion + (rightPortion.substring(1));
        topAdjacentPartNumbers.push(partNumber);

        x += (rightPortion.length - 1);
      }
    }

    return topAdjacentPartNumbers;
  }

  private ParseRightAdjacentPartNumber(
    currentLine: string,
    startIndex: number
  ): string | null {
    let rightAdjacentPartNumber: string | null = null;

    if (startIndex + 1 <= currentLine.length) {
      if (this.CharacterIsDigit(currentLine.charCodeAt(startIndex + 1))) {
        rightAdjacentPartNumber = this.GetFullNumericString(
          currentLine,
          startIndex + 1
        );
      }
    }

    return rightAdjacentPartNumber;
  }
}
