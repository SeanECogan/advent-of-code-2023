import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { Day16PuzzleAComponent } from "./day-16/day-16-puzzle-a/day-16-puzzle-a.component";
import { Day16PuzzleBComponent } from "./day-16/day-16-puzzle-b/day-16-puzzle-b.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.sass',
    imports: [CommonModule, RouterOutlet, Day16PuzzleAComponent, Day16PuzzleBComponent]
})
export class AppComponent {
  title = 'advent-of-code-2023';
}
