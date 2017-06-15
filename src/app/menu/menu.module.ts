import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MenuComponent} from "./menu.component";
import {RouterModule} from "@angular/router";

@NgModule({

  imports: [
    CommonModule,
    RouterModule

  ],
  declarations: [
    MenuComponent
  ],
  providers: [],
  exports: []
})

export class MenuModule {

}

