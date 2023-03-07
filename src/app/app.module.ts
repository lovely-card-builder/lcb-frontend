import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {UiModule} from "./libs/ui/ui.module";
import {ThreeLeavesModule} from "./libs/threejs/three-leaves/three-leaves.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        UiModule,
        ThreeLeavesModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
