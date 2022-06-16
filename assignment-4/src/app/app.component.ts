import { Component, ViewChild } from '@angular/core';
import { EvenCatchComponent } from './even-catch/even-catch.component';
import { OddCatchComponent } from './odd-catch/odd-catch.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'assignment-4';
  
  @ViewChild('evenComponent')
  evenComponent: EvenCatchComponent;
  
  @ViewChild('oddComponent')
  oddComponent: OddCatchComponent;

  onGameTick(event: any) {
    console.log(event)
    if(event % 2 == 0) {
      this.evenComponent.addEventData(event);
    } else {
      this.oddComponent.addEventData(event);
    }
  }

}
