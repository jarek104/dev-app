// tslint:disable: directive-selector
import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[compHost]',
})
export class PageHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
