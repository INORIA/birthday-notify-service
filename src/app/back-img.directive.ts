import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appBackImg]'
})
export class BackImgDirective {
  @Input('appBackImg') backgroundImage: string;
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.el.nativeElement.style.backgroundImage = `url(${this.backgroundImage})`;
  }
}
