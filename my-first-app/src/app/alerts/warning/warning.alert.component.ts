import { Component } from '@angular/core';

@Component({
  selector: 'alert-warning',
  templateUrl: './warning.alert.component.html',
  styleUrls: ['./warning.alert.component.css']
})
export class WarningAlert {
  title = 'Warning!!!';
  message = 'This is an warning alert!';
}
