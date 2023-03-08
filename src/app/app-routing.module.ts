import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, RouterOutlet, Routes} from "@angular/router";


const ROUTES: Routes = [
  {
    path: '',
    pathMatch: "full",
    loadChildren: () => import('./pages/introduction/introduction.module').then(m => m.IntroductionModule)
  },
  {
    path: 'constructor',
    loadChildren: () => import('./pages/constructor/constructor.module').then(m => m.ConstructorModule)
  },
  {
    path: 'how',
    loadChildren: () => import('./pages/how-it-was-made/how-it-was-made.module').then(m => m.HowItWasMadeModule)
  },
  {
    path: 'preview',
    loadChildren: () => import('./pages/preview/preview.module').then(m => m.PreviewModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule.forRoot(ROUTES)
  ],
  exports: [RouterOutlet]
})
export class AppRoutingModule { }
