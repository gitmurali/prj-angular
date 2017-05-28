import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropDown]'
})
export class AppDropDownDirective {


  @HostBinding('class.open') isOpen: boolean = false;

  constructor() { }

  @HostListener("click") toggleOpen() {
      this.isOpen = !this.isOpen;
  }
}
