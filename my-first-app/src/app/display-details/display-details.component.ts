import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-details',
  templateUrl: './display-details.component.html',
  styleUrls: ['./display-details.component.css']
})
export class DisplayDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  show:boolean = false;
  logs:Array<String> = []

  toggleShow() {
    this.show = !this.show;
    this.logs.push('Status change at '+Date.now()+' to: '+(this.show ? 'SHOW' : 'HIDE'));
  }

}
