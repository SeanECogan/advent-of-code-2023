import { Injectable } from '@angular/core';

class Workflow {
  name: string;
  conditions: string[];

  constructor(
    name: string,
    conditions: string[]
  ) {
    this.name = name;
    this.conditions = conditions;
  }
}

class Part {
  x: number;
  m: number;
  a: number;
  s: number;

  constructor(
    x: number,
    m: number,
    a: number,
    s: number
  ) {
    this.x = x;
    this.m = m;
    this.a = a;
    this.s = s;
  }
}

class WorkflowBounds {
  xMin: number;
  xMax: number;
  mMin: number;
  mMax: number;
  aMin: number;
  aMax: number;
  sMin: number;
  sMax: number;

  constructor(
    xMin: number,
    xMax: number,
    mMin: number,
    mMax: number,
    aMin: number,
    aMax: number,
    sMin: number,
    sMax: number
  ) {
    this.xMin = xMin;
    this.xMax = xMax;
    this.mMin = mMin;
    this.mMax = mMax;
    this.aMin = aMin;
    this.aMax = aMax;
    this.sMin = sMin;
    this.sMax = sMax;
  }
}

class Rule {
  rating: string;
  operator: string;
  target: number;
  destination: string;

  constructor(
    rating: string,
    operator: string,
    target: number,
    destination: string
  ) {
    this.rating = rating;
    this.operator = operator;
    this.target = target;
    this.destination = destination;
  }
}

@Injectable({
  providedIn: 'root'
})
export class PuzzleSolverService {

  constructor() { }

  public SolvePuzzleA(input: string): number {
    const inputLines = input.split(/\r?\n|\r|\n/g);

    const workflows: Workflow[] = [];
    const parts: Part[] = [];

    let parsingWorkflows = true;

    inputLines.map((il) => {
      if (il.trim() == '') {
        parsingWorkflows = false;
        return;
      }

      if (parsingWorkflows) {
        const workflowParts = il.split('{');

        const workflowName = workflowParts[0];
        const workflowConditions = workflowParts[1].replace('}', '').split(',');

        workflows.push(new Workflow(workflowName, workflowConditions));
      } else {
        const partParts = il.replace('{', '').replace('}', '').split(',');

        let x = 0;
        let m = 0;
        let a = 0;
        let s = 0;

        partParts.map((pp) => {
          const ratingParts = pp.split('=');

          switch (ratingParts[0]) {
            case 'x':
              x = +(ratingParts[1]);
              break;

            case 'm':
              m = +(ratingParts[1]);
              break;

            case 'a':
              a = +(ratingParts[1]);
              break;

            case 's':
              s = +(ratingParts[1]);
              break;

            default:
              break;
          }
        });

        const part = new Part(
          x,
          m,
          a,
          s
        );

        parts.push(part);
      }
    });

    let ratingTotal = 0;

    parts.map((part) => {
      ratingTotal += this.EvaluatePartAgainstWorkflows(part, workflows);
    });

    return ratingTotal;
  }

  public SolvePuzzleB(input: string): number {
    const inputLines = input.split(/\r?\n|\r|\n/g);

    const workflows: Workflow[] = [];

    let parsingWorkflows = true;

    inputLines.map((il) => {
      if (il.trim() == '') {
        parsingWorkflows = false;
        return;
      }

      if (parsingWorkflows) {
        const workflowParts = il.split('{');

        const workflowName = workflowParts[0];
        const workflowConditions = workflowParts[1].replace('}', '').split(',');

        workflows.push(new Workflow(workflowName, workflowConditions));
      } else {
        return;
      }
    });

    const workflowBounds = this.GetBoundsOfWorkflows('in', workflows, new WorkflowBounds(1, 4000, 1, 4000, 1, 4000, 1, 4000));

    const combinations = workflowBounds.map((bound) => {
      return (bound.xMax - bound.xMin + 1) * (bound.mMax - bound.mMin + 1) * (bound.aMax - bound.aMin + 1) * (bound.sMax - bound.sMin + 1);
    }).reduce((acc, v) => {
      return acc + v;
    });

    return combinations;
  }

  private EvaluatePartAgainstWorkflows(part: Part, workflows: Workflow[]): number {
    let ratingTotal = 0;

    let currentWorkflow = 'in';
    let evaluationComplete = false;

    while (!evaluationComplete) {
      const workflow = workflows.filter(w => w.name == currentWorkflow)[0];

      for (let i = 0; i < workflow.conditions.length; i++) {
        const evaluationResult = this.EvaluatePartAgainstWorkflowCondition(part, workflow.conditions[i]);

        if (evaluationResult == '') {
          continue;
        } else if (evaluationResult == 'R') {
          evaluationComplete = true;
          break;
        } else if (evaluationResult == 'A') {
          evaluationComplete = true;
          ratingTotal = part.x + part.m + part.a + part.s;
          break;
        } else {
          currentWorkflow = evaluationResult;
          break;
        }
      }
    }

    return ratingTotal;
  }

  private EvaluatePartAgainstWorkflowCondition(part: Part, workflowCondition: string): string {
    const conditionParts = workflowCondition.split(':');

    if (conditionParts.length > 1) {
      const result = conditionParts[1];
      let rating = '';
      let comparison = '';
      let target = 0;

      if (conditionParts[0].indexOf('<') >= 0) {
        const conditionEvaluationParts = conditionParts[0].split('<');
        rating = conditionEvaluationParts[0];
        comparison = '<';
        target = +(conditionEvaluationParts[1]);
      } else if (conditionParts[0].indexOf('>') >= 0) {
        const conditionEvaluationParts = conditionParts[0].split('>');
        rating = conditionEvaluationParts[0];
        comparison = '>';
        target = +(conditionEvaluationParts[1]);
      }

      switch (rating) {
        case 'x':
          switch (comparison) {
            case '<':
              if (part.x < target) {
                return result;
              }
              break;

            case '>':
              if (part.x > target) {
                return result;
              }
              break;

            default:
              break;
          }
          break;

        case 'm':
          switch (comparison) {
            case '<':
              if (part.m < target) {
                return result;
              }
              break;

            case '>':
              if (part.m > target) {
                return result;
              }
              break;

            default:
              break;
          }
          break;

        case 'a':
          switch (comparison) {
            case '<':
              if (part.a < target) {
                return result;
              }
              break;

            case '>':
              if (part.a > target) {
                return result;
              }
              break;

            default:
              break;
          }
          break;

        case 's':
          switch (comparison) {
            case '<':
              if (part.s < target) {
                return result;
              }
              break;

            case '>':
              if (part.s > target) {
                return result;
              }
              break;

            default:
              break;
          }
          break;

        default:
          break;
      }
    } else {
      return conditionParts[0];
    }

    return '';
  }

  private GetBoundsOfWorkflows(workflowName: string, workflows: Workflow[], workflowBounds: WorkflowBounds): WorkflowBounds[] {
    if (workflowName == 'R') {
      return [];
    }

    if (workflowName == 'A') {
      return [this.CopyWorkflowBounds(workflowBounds)];
    }

    const workflow = workflows.filter(w => w.name == workflowName)[0];

    const bounds: WorkflowBounds[] = [];

    workflow.conditions.map((c) => {
      const rule = this.ParseRule(c);

      if (rule.operator == '') {
        bounds.push(...this.GetBoundsOfWorkflows(
          rule.destination,
          workflows,
          this.CopyWorkflowBounds(workflowBounds)
        ));
      }

      if (rule.operator == '<' ||
          rule.operator == '>') {
        const newBounds = this.CopyWorkflowBounds(workflowBounds);

        this.AdjustWorkflowBoundsBasedOnRule(newBounds, rule);

        bounds.push(...this.GetBoundsOfWorkflows(
          rule.destination,
          workflows,
          newBounds
        ));

        this.AdjustWorkflowBoundsBasedOnInverseOfRule(workflowBounds, rule);
      }
    });

    return bounds;
  }

  private ParseRule(workflowCondition: string): Rule {
    const conditionParts = workflowCondition.split(':');

    if (conditionParts.length > 1) {
      const result = conditionParts[1];
      let rating = '';
      let comparison = '';
      let target = 0;

      if (conditionParts[0].indexOf('<') >= 0) {
        const conditionEvaluationParts = conditionParts[0].split('<');
        rating = conditionEvaluationParts[0];
        comparison = '<';
        target = +(conditionEvaluationParts[1]);


      } else if (conditionParts[0].indexOf('>') >= 0) {
        const conditionEvaluationParts = conditionParts[0].split('>');
        rating = conditionEvaluationParts[0];
        comparison = '>';
        target = +(conditionEvaluationParts[1]);
      }

      return new Rule(
        rating,
        comparison,
        target,
        result
      );
    } else {
      return new Rule(
        '',
        '',
        0,
        conditionParts[0]
      );
    }
  }

  private CopyWorkflowBounds(workflowBounds: WorkflowBounds): WorkflowBounds {
    return new WorkflowBounds(
      workflowBounds.xMin,
      workflowBounds.xMax,
      workflowBounds.mMin,
      workflowBounds.mMax,
      workflowBounds.aMin,
      workflowBounds.aMax,
      workflowBounds.sMin,
      workflowBounds.sMax
    );
  }

  private AdjustWorkflowBoundsBasedOnRule(workflowBounds: WorkflowBounds, rule: Rule): void {
    switch (rule.rating) {
      case 'x':
        switch (rule.operator) {
          case '<':
            workflowBounds.xMax = rule.target - 1;
            break;

          case '>':
            workflowBounds.xMin = rule.target + 1;
            break;

          default:
            break;
        }
        break;

      case 'm':
        switch (rule.operator) {
          case '<':
            workflowBounds.mMax = rule.target - 1;
            break;

          case '>':
            workflowBounds.mMin = rule.target + 1;
            break;

          default:
            break;
        }
        break;

      case 'a':
        switch (rule.operator) {
          case '<':
            workflowBounds.aMax = rule.target - 1;
            break;

          case '>':
            workflowBounds.aMin = rule.target + 1;
            break;

          default:
            break;
        }
        break;

      case 's':
        switch (rule.operator) {
          case '<':
            workflowBounds.sMax = rule.target - 1;
            break;

          case '>':
            workflowBounds.sMin = rule.target + 1;
            break;

          default:
            break;
        }
        break;

      default:
        break;
    }
  }

  private AdjustWorkflowBoundsBasedOnInverseOfRule(workflowBounds: WorkflowBounds, rule: Rule): void {
    switch (rule.rating) {
      case 'x':
        switch (rule.operator) {
          case '<':
            workflowBounds.xMin = rule.target;
            break;

          case '>':
            workflowBounds.xMax = rule.target;
            break;

          default:
            break;
        }
        break;

      case 'm':
        switch (rule.operator) {
          case '<':
            workflowBounds.mMin = rule.target;
            break;

          case '>':
            workflowBounds.mMax = rule.target;
            break;

          default:
            break;
        }
        break;

      case 'a':
        switch (rule.operator) {
          case '<':
            workflowBounds.aMin = rule.target;
            break;

          case '>':
            workflowBounds.aMax = rule.target;
            break;

          default:
            break;
        }
        break;

      case 's':
        switch (rule.operator) {
          case '<':
            workflowBounds.sMin = rule.target;
            break;

          case '>':
            workflowBounds.sMax = rule.target;
            break;

          default:
            break;
        }
        break;

      default:
        break;
    }
  }
}
