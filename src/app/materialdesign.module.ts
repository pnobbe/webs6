import {NgModule} from "@angular/core";
import {MdButtonModule, MdCheckboxModule, MdCardModule, MdListModule, MdSelectModule, MdGridListModule, } from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  imports: [BrowserAnimationsModule, MdButtonModule, MdCheckboxModule, MdCardModule, MdListModule,
    MdSelectModule, MdGridListModule],
  exports: [BrowserAnimationsModule, MdButtonModule, MdCheckboxModule, MdCardModule, MdListModule,
    MdSelectModule, MdGridListModule],
})
export class MaterialDesignModule {
}
