import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[num]'
})
export class NumDirective {


  key;
  @HostListener('keydown', ['$event']) onKeydown(event: KeyboardEvent) {
    this.key = event.keyCode;
   
     if (!this.isKeyPressedNumeric) {
      event.preventDefault();
      return false;
    }
   
     
  }

  get isKeyPressedNumeric() {return (this.key >= 48 && this.key <= 57) || (this.key >= 96 && this.key <= 105) || this.key === 8 || this.key === 190}
}
