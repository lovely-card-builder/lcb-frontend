import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {HowItWasMadeComponent} from "./how-it-was-made.component";


@NgModule({
  declarations: [
    HowItWasMadeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HowItWasMadeComponent
      }
    ])
  ]
})
export class HowItWasMadeModule {
}
