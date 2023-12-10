import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { Day10PuzzleAComponent } from "./day-10/day-10-puzzle-a/day-10-puzzle-a.component";
import { Day10PuzzleBComponent } from "./day-10/day-10-puzzle-b/day-10-puzzle-b.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.sass',
    imports: [CommonModule, RouterOutlet, Day10PuzzleAComponent, Day10PuzzleBComponent]
})
export class AppComponent {
  title = 'advent-of-code-2023';
}
