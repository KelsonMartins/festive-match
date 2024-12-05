import { Component } from '@angular/core';
import { GameBoardComponent } from './game-board/game-board.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, GameBoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  numPlayers = 1;
  gridSize = 8;
  gameStarted = false;
  reset = false;

  startGame() {
    this.gameStarted = true;
    this.reset = false;
  }

  resetGame() {
    this.gameStarted = false;
    this.reset = true;
  }
}
