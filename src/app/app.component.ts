import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { Day07PuzzleAComponent } from "./day-07/day-07-puzzle-a/day-07-puzzle-a.component";
import { Day07PuzzleBComponent } from "./day-07/day-07-puzzle-b/day-07-puzzle-b.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.sass',
    imports: [CommonModule, RouterOutlet, Day07PuzzleAComponent, Day07PuzzleBComponent]
})
export class AppComponent {
  title = 'advent-of-code-2023';
}
