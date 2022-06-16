import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {

  @Output() gameTick: EventEmitter<Number> = new EventEmitter<Number>();
  gameFunction: any = null;

  constructor() { }

  getRandomNumber() {
    return Math.round(Math.random() * 1000) % 10;
  }

  ngOnInit(): void {
  }

  startGame() {
    if(this.gameFunction) {
      return null;
    }
    this.gameFunction = setInterval(() => {
      this.gameTick.emit(this.getRandomNumber());
    }, 1500);
  }

  stopGame() {
    if(!this.gameFunction) {
      return null;
    }
    clearInterval(this.gameFunction);
  }

}
