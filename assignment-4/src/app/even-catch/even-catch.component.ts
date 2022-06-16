import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-even-catch',
  templateUrl: './even-catch.component.html',
  styleUrls: ['./even-catch.component.css']
})
export class EvenCatchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  addEventData(e: Number) {
    this.evenData.push(e);
  }

  evenData: Number[] = [];

}
