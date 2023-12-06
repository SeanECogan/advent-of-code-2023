import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { Day05PuzzleAComponent } from "./day-05/day-05-puzzle-a/day-05-puzzle-a.component";
import { Day05PuzzleBComponent } from "./day-05/day-05-puzzle-b/day-05-puzzle-b.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.sass',
    imports: [CommonModule, RouterOutlet, Day05PuzzleAComponent, Day05PuzzleBComponent]
})
export class AppComponent {
  title = 'advent-of-code-2023';
}
