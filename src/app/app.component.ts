import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { Day04PuzzleAComponent } from "./day-04/day-04-puzzle-a/day-04-puzzle-a.component";
import { Day04PuzzleBComponent } from "./day-04/day-04-puzzle-b/day-04-puzzle-b.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.sass',
    imports: [CommonModule, RouterOutlet, Day04PuzzleAComponent, Day04PuzzleBComponent]
})
export class AppComponent {
  title = 'advent-of-code-2023';
}
