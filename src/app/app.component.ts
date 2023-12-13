import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { Day12PuzzleAComponent } from "./day-12/day-12-puzzle-a/day-12-puzzle-a.component";
import { Day12PuzzleBComponent } from "./day-12/day-12-puzzle-b/day-12-puzzle-b.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.sass',
    imports: [CommonModule, RouterOutlet, Day12PuzzleAComponent, Day12PuzzleBComponent]
})
export class AppComponent {
  title = 'advent-of-code-2023';
}
