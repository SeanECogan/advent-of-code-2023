import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { Day09PuzzleAComponent } from "./day-09/day-09-puzzle-a/day-09-puzzle-a.component";
import { Day09PuzzleBComponent } from "./day-09/day-09-puzzle-b/day-09-puzzle-b.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.sass',
    imports: [CommonModule, RouterOutlet, Day09PuzzleAComponent, Day09PuzzleBComponent]
})
export class AppComponent {
  title = 'advent-of-code-2023';
}
