import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { Day14PuzzleAComponent } from "./day-14/day-14-puzzle-a/day-14-puzzle-a.component";
import { Day14PuzzleBComponent } from "./day-14/day-14-puzzle-b/day-14-puzzle-b.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.sass',
    imports: [CommonModule, RouterOutlet, Day14PuzzleAComponent, Day14PuzzleBComponent]
})
export class AppComponent {
  title = 'advent-of-code-2023';
}
