import { Component } from '@angular/core';

@Component({
  selector: 'alert-success',
  templateUrl: './success.alert.component.html',
  styleUrls: ['./success.alert.component.css']
})
export class SuccessAlert {
  title = 'Success!!!';
  message = 'This is an success alert!';
}
