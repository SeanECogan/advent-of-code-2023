import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { Day20PuzzleAComponent } from "./day-20/day-20-puzzle-a/day-20-puzzle-a.component";
import { Day20PuzzleBComponent } from "./day-20/day-20-puzzle-b/day-20-puzzle-b.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.sass',
    imports: [CommonModule, RouterOutlet, Day20PuzzleAComponent, Day20PuzzleBComponent]
})
export class AppComponent {
  title = 'advent-of-code-2023';
}
