import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-example',
    template: '<h1>Example</h1>'
})
export class ExampleComponent implements OnInit {
    ngOnInit(): void {
        console.log('DUmmy component Init');
    }

}