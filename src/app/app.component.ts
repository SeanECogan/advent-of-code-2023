import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { Day19PuzzleAComponent } from "./day-19/day-19-puzzle-a/day-19-puzzle-a.component";
import { Day19PuzzleBComponent } from "./day-19/day-19-puzzle-b/day-19-puzzle-b.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.sass',
    imports: [CommonModule, RouterOutlet, Day19PuzzleAComponent, Day19PuzzleBComponent]
})
export class AppComponent {
  title = 'advent-of-code-2023';
}
