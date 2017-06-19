import {NgModule} from "@angular/core";
import {MdButtonModule, MdCheckboxModule,  MdSelectModule, MdSnackBarModule, MdListModule, MdIconModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  imports: [BrowserAnimationsModule, MdButtonModule, MdCheckboxModule,
    MdSelectModule, MdSnackBarModule, MdListModule, MdIconModule],
  exports: [BrowserAnimationsModule, MdButtonModule, MdCheckboxModule,
    MdSelectModule, MdSnackBarModule, MdListModule, MdIconModule],
})
export class MaterialDesignModule {
}
