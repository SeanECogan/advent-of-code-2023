import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Day01PuzzleAComponent } from "./day-01/day-01-puzzle-a/day-01-puzzle-a.component";
import { Day01PuzzleBComponent } from "./day-01/day-01-puzzle-b/day-01-puzzle-b.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.sass',
    imports: [CommonModule, RouterOutlet, Day01PuzzleAComponent, Day01PuzzleBComponent]
})
export class AppComponent {
  title = 'advent-of-code-2023';
}
