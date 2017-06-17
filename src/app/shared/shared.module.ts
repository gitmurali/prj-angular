import {NgModule} from "@angular/core";
import {AppDropDownDirective} from "./app-drop-down.directive";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
      AppDropDownDirective
  ],
  exports: [
    CommonModule,
    AppDropDownDirective
  ]
})
export class SharedModule {}
