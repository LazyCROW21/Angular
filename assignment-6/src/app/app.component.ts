import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  email: string;
  password: string;
  plan: string;

  @ViewChild('f')
  form: NgForm;

  planSelect: string;

  ngOnInit() {
    this.planSelect = 'advance';
  }

  onSubmit() {
    const formData = this.form.form;
    console.log(formData);
    this.email = formData.value['email'];
    this.password = formData.value['password'];
    this.plan = formData.value['plan'];
  }
}
