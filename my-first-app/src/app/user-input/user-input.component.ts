import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  userName:string = ''
  btnState:boolean = true;
  userString = 'Enter user name!';

  onUpdateUN(event: Event) {
    if((<HTMLInputElement>event.target).value) {
      return this.btnState = false;
    }
    this.btnState = true;
  }

  onSubmit() {
    if(this.userName) {
      this.userString = `Your username is ${this.userName}`;
      this.userName = ''
      this.btnState = true;
    }
  }
}
