import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[loadLocation]'
})
export class LoadLocationDirective {

  constructor(el: ElementRef) {
    console.log(el);
   }

}
