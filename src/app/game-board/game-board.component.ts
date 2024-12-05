import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';

interface Card {
  id: number;
  symbol: string;
  flipped: boolean;
}

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss'
})
export class GameBoardComponent implements OnInit, OnChanges {
  @Input() numPlayers: number | undefined;
  @Input() gridSize: number = 8;
  @Input() reset: boolean = false;
  cards: Card[] = [];
  flippedCards: Card[] = [];
  matchedCards: Set<number> = new Set();
  currentPlayer: number = 1;
  playerScores: number[] = [];

  ngOnInit() {
    this.initializeGame();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['reset'] && changes['reset'].currentValue) {
      this.initializeGame();
    }
  }

  initializeGame() {
    this.playerScores = Array(this.numPlayers).fill(0);
    this.initializeCards();
  }

  initializeCards() {
    const christmasSongs = [
      'Jingle Bells', 'Silent Night', 'Deck the Halls', 'Joy to the World',
      'O Holy Night', 'The First Noel', 'Hark! The Herald Angels Sing', 'O Come All Ye Faithful',
      'We Wish You a Merry Christmas', 'Frosty the Snowman', 'Rudolph the Red-Nosed Reindeer', 'Santa Claus Is Coming to Town',
      'White Christmas', 'Let It Snow', 'Winter Wonderland', 'Have Yourself a Merry Little Christmas'
    ];
    const numPairs = (this.gridSize * this.gridSize) / 2;
    const symbols = christmasSongs.slice(0, numPairs);
    const shuffledSymbols = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
    this.cards = shuffledSymbols.map((symbol, index) => ({ id: index, symbol, flipped: false }));
    this.flippedCards = [];
    this.matchedCards.clear();
    this.currentPlayer = 1;
  }

  handleCardClick(card: Card) {
    if (this.flippedCards.length < 2 && !card.flipped && !this.matchedCards.has(card.id)) {
      card.flipped = true;
      this.flippedCards.push(card);

      if (this.flippedCards.length === 2) {
        const [firstCard, secondCard] = this.flippedCards;
        if (firstCard.symbol === secondCard.symbol) {
          this.matchedCards.add(firstCard.id);
          this.matchedCards.add(secondCard.id);
          this.playerScores[this.currentPlayer - 1]++;
          this.checkForWin();
        } else {
          setTimeout(() => {
            firstCard.flipped = false;
            secondCard.flipped = false;
          }, 1000);
        }
        this.flippedCards = [];
        this.switchPlayer();
      }
    }
  }

  switchPlayer() {
    if (this.numPlayers! > 1) {
      this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
    }
  }

  checkForWin() {
    if (this.matchedCards.size === this.cards.length) {
      const winner = this.playerScores.indexOf(Math.max(...this.playerScores)) + 1;
      alert(`Player ${winner} wins!`);
    }
  }
}
