import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PuzzleSolverService {

  private readonly _charCodeZero: number = "0".charCodeAt(0);
  private readonly _charCodeNine: number = "9".charCodeAt(0);

  private readonly _textNumbers: string[] = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine'
  ];

  constructor() { }

  public SolvePuzzleA(input: string): number {
    const inputLines = input.split(/\r?\n|\r|\n/g);

    let calibrationValue = 0;

    inputLines.map((il) => {
      let firstDigitCharacter: string | null = null;
      let lastDigitCharacter: string | null = null;

      for (let i = 0; i < il.length; i++) {
        if (this.CharacterIsDigit(il.charCodeAt(i))) {
          if (firstDigitCharacter == null) {
            firstDigitCharacter = il.charAt(i);
          }

          lastDigitCharacter = il.charAt(i);
        }
      }

      if (firstDigitCharacter != null && lastDigitCharacter != null) {
        const lineCalibrationNumber = +(firstDigitCharacter + lastDigitCharacter);

        calibrationValue += lineCalibrationNumber;
      }
    });

    return calibrationValue;
  }

  public SolvePuzzleB(input: string): number {
    const inputLines = input.split(/\r?\n|\r|\n/g);

    let calibrationValue = 0;

    inputLines.map((il) => {
      let firstDigitCharacter: string | null = null;
      let lastDigitCharacter: string | null = null;

      for (let i = 0; i < il.length; i++) {
        if (this.CharacterIsDigit(il.charCodeAt(i))) {
          if (firstDigitCharacter == null) {
            firstDigitCharacter = il.charAt(i);
          }

          lastDigitCharacter = il.charAt(i);
        } else {
          this._textNumbers.map((tn) => {
            if (this.CharacterStartsTextNumber(
              i,
              il,
              tn
            )) {
              if (firstDigitCharacter == null) {
                firstDigitCharacter = this.GetCharacterFromTextNumber(tn);
              }

              lastDigitCharacter = this.GetCharacterFromTextNumber(tn);
            }
          })
        }
      }

      if (firstDigitCharacter != null && lastDigitCharacter != null) {
        const lineCalibrationNumber = +(firstDigitCharacter + lastDigitCharacter);

        console.log(lineCalibrationNumber);

        calibrationValue += lineCalibrationNumber;
      }
    });

    return calibrationValue;
  }

  private CharacterIsDigit(characterCode: number): boolean {
    return (characterCode >= this._charCodeZero && characterCode <= this._charCodeNine);
  }

  private CharacterStartsTextNumber(characterIndex: number, inputLine: string, textNumber: string): boolean {
    return inputLine.substring(characterIndex, characterIndex + textNumber.length) == textNumber;
  }

  private GetCharacterFromTextNumber(textNumber: string): string {
    switch (textNumber) {
      case 'one':
        return '1';
        
      case 'two':
        return '2';
        
      case 'three':
        return '3';
        
      case 'four':
        return '4';
        
      case 'five':
        return '5';
        
      case 'six':
        return '6';
        
      case 'seven':
        return '7';
        
      case 'eight':
        return '8';
        
      case 'nine':
        return '9';

      default:
        return '0';
    }
  }
}
