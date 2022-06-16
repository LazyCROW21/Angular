import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GameControlComponent } from './game-control/game-control.component';
import { OddCatchComponent } from './odd-catch/odd-catch.component';
import { EvenCatchComponent } from './even-catch/even-catch.component';

@NgModule({
  declarations: [
    AppComponent,
    GameControlComponent,
    OddCatchComponent,
    EvenCatchComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
