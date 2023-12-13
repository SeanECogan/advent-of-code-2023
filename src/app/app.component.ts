import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { Day13PuzzleAComponent } from "./day-13/day-13-puzzle-a/day-13-puzzle-a.component";
import { Day13PuzzleBComponent } from "./day-13/day-13-puzzle-b/day-13-puzzle-b.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.sass',
    imports: [CommonModule, RouterOutlet, Day13PuzzleAComponent, Day13PuzzleBComponent]
})
export class AppComponent {
  title = 'advent-of-code-2023';
}
