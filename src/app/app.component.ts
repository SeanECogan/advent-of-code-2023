import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { Day08PuzzleAComponent } from "./day-08/day-08-puzzle-a/day-08-puzzle-a.component";
import { Day08PuzzleBComponent } from "./day-08/day-08-puzzle-b/day-08-puzzle-b.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.sass',
    imports: [CommonModule, RouterOutlet, Day08PuzzleAComponent, Day08PuzzleBComponent]
})
export class AppComponent {
  title = 'advent-of-code-2023';
}
