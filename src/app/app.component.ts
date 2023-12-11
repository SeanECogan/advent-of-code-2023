import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { Day11PuzzleAComponent } from "./day-11/day-11-puzzle-a/day-11-puzzle-a.component";
import { Day11PuzzleBComponent } from "./day-11/day-11-puzzle-b/day-11-puzzle-b.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.sass',
    imports: [CommonModule, RouterOutlet, Day11PuzzleAComponent, Day11PuzzleBComponent]
})
export class AppComponent {
  title = 'advent-of-code-2023';
}
