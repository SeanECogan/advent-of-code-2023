import { Injectable } from '@angular/core';
import { range } from 'rxjs';

class Map {
  sourceRangeStart: number;
  sourceRangeEnd: number;

  destinationRangeStart: number;
  destinationRangeEnd: number;

  constructor(
    sourceRangeStart: number,
    destinationRangeStart: number,
    rangeLength: number
  ) {
    this.sourceRangeStart = sourceRangeStart;
    this.sourceRangeEnd = sourceRangeStart + rangeLength;

    this.destinationRangeStart = destinationRangeStart;
    this.destinationRangeEnd = destinationRangeStart + rangeLength;
  }
}

class Range {
  start: number;
  end: number;

  constructor(
    start: number,
    end: number
  ) {
    this.start = start;
    this.end = end;
  }
}

class MapRange {
  sourceRange: Range;
  destinationRange: Range;

  constructor(
    sourceRangeStart: number,
    destinationRangeStart: number,
    rangeLength: number
  ) {
    this.sourceRange = new Range(
      sourceRangeStart,
      sourceRangeStart + rangeLength
    );

    this.destinationRange = new Range(
      destinationRangeStart,
      destinationRangeStart + rangeLength
    );
  }
}

@Injectable({
  providedIn: 'root'
})
export class PuzzleSolverService {

  constructor() { }

  public SolvePuzzleA(input: string): number {
    const inputLines = input.split(/\r?\n|\r|\n/g);

    let seedNumbers: number[] = [];

    let seedToSoilMaps: Map[] = [];
    let soilToFertilizerMaps: Map[] = [];
    let fertilizerToWaterMaps: Map[] = [];
    let waterToLightMaps: Map[] = [];
    let lightToTemperatureMaps: Map[] = [];
    let temperatureToHumidityMaps: Map[] = [];
    let humidityToLocationMaps: Map[] = [];

    let parseSeedToSoilMaps: boolean = false;
    let parseSoilToFertilizerMaps: boolean = false;
    let parseFertilizerToWaterMaps: boolean = false;
    let parseWaterToLightMaps: boolean = false;
    let parseLightToTemperatureMaps: boolean = false;
    let parseTemperatureToHumidityMaps: boolean = false;
    let parseHumidityToLocationMaps: boolean = false;

    for (let i = 0; i < inputLines.length; i++) {
      if (inputLines[i].indexOf('seeds') >= 0) {
        seedNumbers = this.ParseSeedNumbersFromLine(inputLines[i]);
      }

      if (inputLines[i].trim() == '') {
        parseSeedToSoilMaps = false;
        parseSoilToFertilizerMaps = false;
        parseFertilizerToWaterMaps = false;
        parseWaterToLightMaps = false;
        parseLightToTemperatureMaps = false;
        parseTemperatureToHumidityMaps = false;
        parseHumidityToLocationMaps = false;
      }

      if (parseSeedToSoilMaps) {
        seedToSoilMaps.push(this.ParseMapFromline(inputLines[i]));
      }

      if (parseSoilToFertilizerMaps) {
        soilToFertilizerMaps.push(this.ParseMapFromline(inputLines[i]));
      }

      if (parseFertilizerToWaterMaps) {
        fertilizerToWaterMaps.push(this.ParseMapFromline(inputLines[i]));
      }

      if (parseWaterToLightMaps) {
        waterToLightMaps.push(this.ParseMapFromline(inputLines[i]));
      }

      if (parseLightToTemperatureMaps) {
        lightToTemperatureMaps.push(this.ParseMapFromline(inputLines[i]));
      }

      if (parseTemperatureToHumidityMaps) {
        temperatureToHumidityMaps.push(this.ParseMapFromline(inputLines[i]));
      }

      if (parseHumidityToLocationMaps) {
        humidityToLocationMaps.push(this.ParseMapFromline(inputLines[i]));
      }

      if (inputLines[i].indexOf('seed-to-soil map') >= 0) {
        parseSeedToSoilMaps = true;
      }

      if (inputLines[i].indexOf('soil-to-fertilizer map') >= 0) {
        parseSoilToFertilizerMaps = true;
      }

      if (inputLines[i].indexOf('fertilizer-to-water map') >= 0) {
        parseFertilizerToWaterMaps = true;
      }

      if (inputLines[i].indexOf('water-to-light map') >= 0) {
        parseWaterToLightMaps = true;
      }

      if (inputLines[i].indexOf('light-to-temperature map') >= 0) {
        parseLightToTemperatureMaps = true;
      }

      if (inputLines[i].indexOf('temperature-to-humidity map') >= 0) {
        parseTemperatureToHumidityMaps = true;
      }

      if (inputLines[i].indexOf('humidity-to-location map') >= 0) {
        parseHumidityToLocationMaps = true;
      }
    };

    let locationNumbers: number[] = [];

    seedNumbers.map((sn) => {
      const soilNumber = this.GetDestinationValueFromMaps(
        sn,
        seedToSoilMaps
      );

      const fertilizerNumber = this.GetDestinationValueFromMaps(
        soilNumber,
        soilToFertilizerMaps
      );

      const waterNumber = this.GetDestinationValueFromMaps(
        fertilizerNumber,
        fertilizerToWaterMaps
      );

      const lightNumber = this.GetDestinationValueFromMaps(
        waterNumber,
        waterToLightMaps
      );

      const temperatureNumber = this.GetDestinationValueFromMaps(
        lightNumber,
        lightToTemperatureMaps
      );

      const humidityNumber = this.GetDestinationValueFromMaps(
        temperatureNumber,
        temperatureToHumidityMaps
      );

      const locationNumber = this.GetDestinationValueFromMaps(
        humidityNumber,
        humidityToLocationMaps
      );

      locationNumbers.push(locationNumber);
    });

    return Math.min(...locationNumbers);
  }

  public SolvePuzzleB(input: string): number {
    const inputLines = input.split(/\r?\n|\r|\n/g);

    let seedNumberRanges: Range[] = [];

    let seedToSoilMaps: Map[] = [];
    let soilToFertilizerMaps: Map[] = [];
    let fertilizerToWaterMaps: Map[] = [];
    let waterToLightMaps: Map[] = [];
    let lightToTemperatureMaps: Map[] = [];
    let temperatureToHumidityMaps: Map[] = [];
    let humidityToLocationMaps: Map[] = [];

    let parseSeedToSoilMaps: boolean = false;
    let parseSoilToFertilizerMaps: boolean = false;
    let parseFertilizerToWaterMaps: boolean = false;
    let parseWaterToLightMaps: boolean = false;
    let parseLightToTemperatureMaps: boolean = false;
    let parseTemperatureToHumidityMaps: boolean = false;
    let parseHumidityToLocationMaps: boolean = false;

    for (let i = 0; i < inputLines.length; i++) {
      if (inputLines[i].indexOf('seeds') >= 0) {
        seedNumberRanges = this.ParseSeedNumberRangesFromLine(inputLines[i]);
      }

      if (inputLines[i].trim() == '') {
        parseSeedToSoilMaps = false;
        parseSoilToFertilizerMaps = false;
        parseFertilizerToWaterMaps = false;
        parseWaterToLightMaps = false;
        parseLightToTemperatureMaps = false;
        parseTemperatureToHumidityMaps = false;
        parseHumidityToLocationMaps = false;
      }

      if (parseSeedToSoilMaps) {
        seedToSoilMaps.push(this.ParseMapFromline(inputLines[i]));
      }

      if (parseSoilToFertilizerMaps) {
        soilToFertilizerMaps.push(this.ParseMapFromline(inputLines[i]));
      }

      if (parseFertilizerToWaterMaps) {
        fertilizerToWaterMaps.push(this.ParseMapFromline(inputLines[i]));
      }

      if (parseWaterToLightMaps) {
        waterToLightMaps.push(this.ParseMapFromline(inputLines[i]));
      }

      if (parseLightToTemperatureMaps) {
        lightToTemperatureMaps.push(this.ParseMapFromline(inputLines[i]));
      }

      if (parseTemperatureToHumidityMaps) {
        temperatureToHumidityMaps.push(this.ParseMapFromline(inputLines[i]));
      }

      if (parseHumidityToLocationMaps) {
        humidityToLocationMaps.push(this.ParseMapFromline(inputLines[i]));
      }

      if (inputLines[i].indexOf('seed-to-soil map') >= 0) {
        parseSeedToSoilMaps = true;
      }

      if (inputLines[i].indexOf('soil-to-fertilizer map') >= 0) {
        parseSoilToFertilizerMaps = true;
      }

      if (inputLines[i].indexOf('fertilizer-to-water map') >= 0) {
        parseFertilizerToWaterMaps = true;
      }

      if (inputLines[i].indexOf('water-to-light map') >= 0) {
        parseWaterToLightMaps = true;
      }

      if (inputLines[i].indexOf('light-to-temperature map') >= 0) {
        parseLightToTemperatureMaps = true;
      }

      if (inputLines[i].indexOf('temperature-to-humidity map') >= 0) {
        parseTemperatureToHumidityMaps = true;
      }

      if (inputLines[i].indexOf('humidity-to-location map') >= 0) {
        parseHumidityToLocationMaps = true;
      }
    };

    let lowestLocationNumber = Number.MAX_SAFE_INTEGER;

    let highestLocationNumber = 0;

    humidityToLocationMaps.map((htlm) => {
      if (htlm.destinationRangeEnd > highestLocationNumber) {
        highestLocationNumber = htlm.destinationRangeEnd;
      }
    });

    for (let i = 0; i <= highestLocationNumber; i++) {
      const humidityNumber = this.GetSourceValueFromMaps(
        i,
        humidityToLocationMaps
      );

      const temperatureNumber = this.GetSourceValueFromMaps(
        humidityNumber,
        temperatureToHumidityMaps
      );

      const lightNumber = this.GetSourceValueFromMaps(
        temperatureNumber,
        lightToTemperatureMaps
      );

      const waterNumber = this.GetSourceValueFromMaps(
        lightNumber,
        waterToLightMaps
      );

      const fertilizerNumber = this.GetSourceValueFromMaps(
        waterNumber,
        fertilizerToWaterMaps
      );

      const soilNumber = this.GetSourceValueFromMaps(
        fertilizerNumber,
        soilToFertilizerMaps
      );

      const seedNumber = this.GetSourceValueFromMaps(
        soilNumber,
        seedToSoilMaps
      );

      seedNumberRanges.map((snr) => {
        if (seedNumber >= snr.start && seedNumber <= snr.end) {
          if (i < lowestLocationNumber) {
            lowestLocationNumber = i;
          }
        }
      });
    }

    return lowestLocationNumber;
  }

  private ParseSeedNumbersFromLine(line: string): number[] {
    const lineParts = line.split(':');
    const seedNumbersString = lineParts[1].trim();

    return seedNumbersString.split(/\s+/).map((sn) => {
      return +(sn.trim());
    });
  }

  private ParseMapFromline(line: string): Map {
    const lineParts = line.split(/\s+/);

    return new Map(
      +(lineParts[1]),
      +(lineParts[0]),
      +(lineParts[2])
    );
  }

  private GetDestinationValueFromMaps(
    sourceValue: number,
    maps: Map[]
  ): number {
    const matchingMaps = maps.filter((m) => {
      return m.sourceRangeStart <= sourceValue && m.sourceRangeEnd >= sourceValue
    });

    if (matchingMaps != null && matchingMaps.length > 0) {
      const offset = sourceValue - matchingMaps[0].sourceRangeStart;

      return matchingMaps[0].destinationRangeStart + offset;
    }
    else {
      return sourceValue;
    }
  }

  private GetSourceValueFromMaps(
    destinationValue: number,
    maps: Map[]
  ): number {
    const matchingMaps = maps.filter((m) => {
      return m.destinationRangeStart <= destinationValue && m.destinationRangeEnd >= destinationValue
    });

    if (matchingMaps != null && matchingMaps.length > 0) {
      const offset = destinationValue - matchingMaps[0].destinationRangeStart;

      return matchingMaps[0].sourceRangeStart + offset;
    }
    else {
      return destinationValue;
    }
  }

  private ParseSeedNumberRangesFromLine(line: string): Range[] {
    const lineParts = line.split(':');
    const seedNumbersString = lineParts[1].trim();
    const seedNumberStringParts = seedNumbersString.split(/\s+/).map((sns) => {
      return +(sns.trim());
    });

    let seedNumberRanges: Range[] = [];

    for (let i = 0; i < seedNumberStringParts.length; i += 2) {
      const seedNumberStart = seedNumberStringParts[i];
      const seedNumberRange = seedNumberStringParts[i + 1];

      seedNumberRanges.push(new Range(
        seedNumberStart,
        seedNumberStart + seedNumberRange
      ));
    }

    return seedNumberRanges;
  }

  private ValueIsLocalMinOrMax(
    value: number,
    maps: Map[]
  ): boolean {
    let valueIsLocalMinOrMax = false;

    maps.map((m) => {
      if (value == m.destinationRangeStart || value == m.destinationRangeEnd) {
        valueIsLocalMinOrMax = true;
      }
    });

    return valueIsLocalMinOrMax;
  }
}
