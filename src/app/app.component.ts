import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { Day15PuzzleAComponent } from "./day-15/day-15-puzzle-a/day-15-puzzle-a.component";
import { Day15PuzzleBComponent } from "./day-15/day-15-puzzle-b/day-15-puzzle-b.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.sass',
    imports: [CommonModule, RouterOutlet, Day15PuzzleAComponent, Day15PuzzleBComponent]
})
export class AppComponent {
  title = 'advent-of-code-2023';
}
