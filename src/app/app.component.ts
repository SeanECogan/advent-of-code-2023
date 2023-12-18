import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { Day17PuzzleAComponent } from "./day-17/day-17-puzzle-a/day-17-puzzle-a.component";
import { Day17PuzzleBComponent } from "./day-17/day-17-puzzle-b/day-17-puzzle-b.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.sass',
    imports: [CommonModule, RouterOutlet, Day17PuzzleAComponent, Day17PuzzleBComponent]
})
export class AppComponent {
  title = 'advent-of-code-2023';
}
