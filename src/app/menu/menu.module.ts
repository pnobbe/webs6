import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MenuComponent} from "./menu.component";
import {RouterModule} from "@angular/router";
import {MaterialDesignModule} from "../materialdesign.module";

@NgModule({

  imports: [
    CommonModule,
    RouterModule,
    MaterialDesignModule

  ],
  declarations: [
    MenuComponent
  ],
  providers: [],
  exports: [MenuComponent]
})

export class MenuModule {

}

