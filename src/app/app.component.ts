import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { Day06PuzzleAComponent } from "./day-06/day-06-puzzle-a/day-06-puzzle-a.component";
import { Day06PuzzleBComponent } from "./day-06/day-06-puzzle-b/day-06-puzzle-b.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.sass',
    imports: [CommonModule, RouterOutlet, Day06PuzzleAComponent, Day06PuzzleBComponent]
})
export class AppComponent {
  title = 'advent-of-code-2023';
}
