import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-odd-catch',
  templateUrl: './odd-catch.component.html',
  styleUrls: ['./odd-catch.component.css']
})
export class OddCatchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  addEventData(e: Number) {
    this.oddData.push(e);
  }

  oddData: Number[] = []

}
