import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { Day18PuzzleAComponent } from "./day-18/day-18-puzzle-a/day-18-puzzle-a.component";
import { Day18PuzzleBComponent } from "./day-18/day-18-puzzle-b/day-18-puzzle-b.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.sass',
    imports: [CommonModule, RouterOutlet, Day18PuzzleAComponent, Day18PuzzleBComponent]
})
export class AppComponent {
  title = 'advent-of-code-2023';
}
