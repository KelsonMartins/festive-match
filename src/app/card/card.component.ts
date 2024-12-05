import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

interface Card {
  id: number;
  symbol: string;
  flipped: boolean;
}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() card: Card | undefined;
  @Output() click = new EventEmitter<void>();

  onClick() {
    this.click.emit();
  }
}
