import { Injectable } from '@angular/core';
enum State {
  Off,
  On
}

enum Pulse {
  Low,
  High
}

class PulseAction {
  pulse: Pulse;
  source: string;
  destination: string;

  constructor(
    pulse: Pulse,
    source: string,
    destination: string
  ) {
    this.pulse = pulse;
    this.source = source;
    this.destination = destination;
  }
}

interface IModule {
  name: string;
  destinationNames: string[];

  ReceivePulse(pulseSource: IModule | undefined, pulse: Pulse, pulseQueue: PulseAction[]): void;

  AddPulsesToQueue(pulseQueue: PulseAction[], pulse: Pulse): void;
}

class FlipFlop implements IModule {
  name: string;
  destinationNames: string[];

  private state: State;

  constructor(
    name: string,
    destinationNames: string[]) {
    this.name = name;
    this.destinationNames = destinationNames;

    this.state = State.Off;
  }

  ReceivePulse(
    pulseSource: IModule | undefined,
    pulse: Pulse,
    pulseQueue: PulseAction[]): void {
    if (pulse == Pulse.Low) {
      if (this.state == State.Off) {
        this.state = State.On;

        this.AddPulsesToQueue(pulseQueue, Pulse.High);
      } else {
        this.state = State.Off;

        this.AddPulsesToQueue(pulseQueue, Pulse.Low);
      }
    }
  }

  AddPulsesToQueue(pulseQueue: PulseAction[], pulse: Pulse): void {
    this.destinationNames.map((destinationName) => {
      pulseQueue.push(new PulseAction(
        pulse,
        this.name,
        destinationName
      ));
    });
  }
}

class Conjunction implements IModule {
  name: string;
  destinationNames: string[];

  sourceStates: Map<string, Pulse>;

  constructor(
    name: string,
    destinationNames: string[]
  ) {
    this.name = name;
    this.destinationNames = destinationNames;

    this.sourceStates = new Map<string, Pulse>();
  }

  ReceivePulse(
    pulseSource: IModule | undefined,
    pulse: Pulse,
    pulseQueue: PulseAction[]): void {
    if (pulseSource != undefined) {
      this.sourceStates.set(pulseSource.name, pulse);
    }

    const currentSourceStates: Pulse[] = [];

    this.sourceStates.forEach((ss) => {
      currentSourceStates.push(ss);
    });

    if (currentSourceStates.filter(css => css == Pulse.High).length == currentSourceStates.length) {
      this.AddPulsesToQueue(
        pulseQueue,
        Pulse.Low
      );
    } else {
      this.AddPulsesToQueue(
        pulseQueue,
        Pulse.High
      );
    }
  }

  AddPulsesToQueue(
    pulseQueue: PulseAction[],
    pulse: Pulse): void {
      this.destinationNames.map((destinationName) => {
        pulseQueue.push(new PulseAction(
          pulse,
          this.name,
          destinationName
        ));
      });
  }

  InitializeSources(sourceNames: string[]) {
    sourceNames.map((sn) => {
      this.sourceStates.set(sn, Pulse.Low);
    })
  }

  GetSourceNames(): string[] {
    return Array.from(this.sourceStates.keys());
  }
}

class Broadcaster implements IModule {
  name: string;
  destinationNames: string[];

  constructor(
    name: string,
    destinationNames: string[]
  ) {
    this.name = name;
    this.destinationNames = destinationNames;
  }

  ReceivePulse(
    pulseSource: IModule | undefined,
    pulse: Pulse,
    pulseQueue: PulseAction[]): void {
    this.AddPulsesToQueue(
      pulseQueue,
      pulse
    );
  }

  AddPulsesToQueue(
    pulseQueue: PulseAction[],
    pulse: Pulse): void {
      this.destinationNames.map((destinationName) => {
        pulseQueue.push(new PulseAction(
          pulse,
          this.name,
          destinationName
        ));
      });
  }
}

@Injectable({
  providedIn: 'root'
})
export class PuzzleSolverService {

  constructor() { }

  public SolvePuzzleA(input: string): number {
    const inputLines = input.split(/\r?\n|\r|\n/g);

    const modules: Map<string, IModule> = new Map<string, IModule>();

    inputLines.map((il) => {
      const lineParts = il.split('->').map(part => part.trim());

      const moduleName = lineParts[0];
      const moduleDestinationNames = lineParts[1].split(',').map(destination => destination.trim());

      if (moduleName == 'broadcaster') {
        modules.set(moduleName, new Broadcaster(
          moduleName,
          moduleDestinationNames
        ));
      } else if (moduleName.startsWith('%')) {
        modules.set(moduleName.replace('%',''), new FlipFlop(
          moduleName.replace('%',''),
          moduleDestinationNames
        ));
      } else if (moduleName.startsWith('&')) {
        modules.set(moduleName.replace('&',''), new Conjunction(
          moduleName.replace('&',''),
          moduleDestinationNames
        ));
      }
    });

    modules.forEach((module) => {
      const sourceNames: string[] = [];

      if (module instanceof Conjunction) {
        modules.forEach((mod) => {
          if (mod.destinationNames.filter(dn => dn == module.name).length > 0) {
            sourceNames.push(mod.name);
          }
        });

        (module as Conjunction).InitializeSources(sourceNames);
      }
    });

    let highPulseCount = 0;
    let lowPulseCount = 0;

    const startTime = new Date();

    for (let i = 0; i < 1000; i++) {
      const pulseQueue: PulseAction[] = [new PulseAction(Pulse.Low, 'button', 'broadcaster')];

      while (pulseQueue.length > 0) {
        const currentPulseAction = pulseQueue.shift();

        if (currentPulseAction!.pulse == Pulse.Low) {
          lowPulseCount++;
        } else {
          highPulseCount++;
        }

        const sourceModule = modules.get(currentPulseAction!.source);
        const destinationModule = modules.get(currentPulseAction!.destination);

        if (destinationModule != undefined) {
          destinationModule.ReceivePulse(
            sourceModule,
            currentPulseAction!.pulse,
            pulseQueue
          );
        }
      }
    }

    const endTime = new Date();

    console.log('Completed run in ' + (endTime.getTime() - startTime.getTime()) + ' ms.');

    return highPulseCount * lowPulseCount;
  }

  public SolvePuzzleB(input: string): number {
    const inputLines = input.split(/\r?\n|\r|\n/g);

    const modules: Map<string, IModule> = new Map<string, IModule>();

    inputLines.map((il) => {
      const lineParts = il.split('->').map(part => part.trim());

      const moduleName = lineParts[0];
      const moduleDestinationNames = lineParts[1].split(',').map(destination => destination.trim());

      if (moduleName == 'broadcaster') {
        modules.set(moduleName, new Broadcaster(
          moduleName,
          moduleDestinationNames
        ));
      } else if (moduleName.startsWith('%')) {
        modules.set(moduleName.replace('%',''), new FlipFlop(
          moduleName.replace('%',''),
          moduleDestinationNames
        ));
      } else if (moduleName.startsWith('&')) {
        modules.set(moduleName.replace('&',''), new Conjunction(
          moduleName.replace('&',''),
          moduleDestinationNames
        ));
      }
    });

    modules.forEach((module) => {
      const sourceNames: string[] = [];

      if (module instanceof Conjunction) {
        modules.forEach((mod) => {
          if (mod.destinationNames.filter(dn => dn == module.name).length > 0) {
            sourceNames.push(mod.name);
          }
        });

        (module as Conjunction).InitializeSources(sourceNames);
      }
    });

    let penultimateModule: IModule | null = null;

    modules.forEach((module) => {
      if (penultimateModule == null) {
        if (module.destinationNames.filter(dn => dn == 'rx').length > 0) {
          penultimateModule = module;
        }
      }
    });

    const penultimateSources = (penultimateModule! as Conjunction).GetSourceNames();

    const cycleLengths: Map<string, number> = new Map<string, number>();

    penultimateSources.map((ps) => {
      cycleLengths.set(ps, 0);
    });

    let buttonPressCount = 0;

    while (!this.CycleLengthsAreAllPopulated(cycleLengths)) {
      buttonPressCount++;

      const pulseQueue: PulseAction[] = [new PulseAction(Pulse.Low, 'button', 'broadcaster')];

      while (pulseQueue.length > 0) {
        const currentPulseAction = pulseQueue.shift();

        if (currentPulseAction!.destination == penultimateModule!.name &&
            currentPulseAction!.pulse == Pulse.High) {
          if (cycleLengths.get(currentPulseAction!.source) == 0) {
            cycleLengths.set(currentPulseAction!.source, buttonPressCount);
          }
        } 

        const sourceModule = modules.get(currentPulseAction!.source);
        const destinationModule = modules.get(currentPulseAction!.destination);

        if (destinationModule != undefined) {
          destinationModule.ReceivePulse(
            sourceModule,
            currentPulseAction!.pulse,
            pulseQueue
          );
        }
      }
    }

    let totalLength = 1;

    cycleLengths.forEach(cl => totalLength *= cl);

    return totalLength;
  }

  private CycleLengthsAreAllPopulated(cycleLengths: Map<string, number>) {
    let allPopulated = true;

    cycleLengths.forEach((cl) => {
      if (cl == 0) {
        allPopulated = false;
      }
    });

    return allPopulated;
  }
}
