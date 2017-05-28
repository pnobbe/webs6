import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MenuComponent} from "../menu/menu.component";
import {RouterModule} from '@angular/router';

@NgModule({

  imports: [
    CommonModule,
    RouterModule

  ],
  declarations: [
    MenuComponent
  ],
  providers: [],
  exports: [MenuComponent]
})
export class MenuModule {

}

