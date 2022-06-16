import { AfterContentInit, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentInit {
  ngAfterContentInit(): void {
    console.log('Content Init');
  }
  title = 'shopping-app';
}
