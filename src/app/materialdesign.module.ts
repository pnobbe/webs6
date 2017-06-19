import {NgModule} from "@angular/core";
import {MdButtonModule, MdCheckboxModule,  MdSelectModule, MdSnackBarModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  imports: [BrowserAnimationsModule, MdButtonModule, MdCheckboxModule,
    MdSelectModule, MdSnackBarModule],
  exports: [BrowserAnimationsModule, MdButtonModule, MdCheckboxModule,
    MdSelectModule, MdSnackBarModule],
})
export class MaterialDesignModule {
}
