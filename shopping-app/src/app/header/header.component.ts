import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css']
})
export class HeaderComponent {
    @Output('route')
    route: EventEmitter<String> = new EventEmitter<String>();
    
    url: string;

    setUrl(url: string) {
        this.url = url;
        this.route.emit(this.url);
    }
}