import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appBackImg]'
})
export class BackImgDirective {
  @Input('appBackImg') backgroundImage: string;
  constructor(private el: ElementRef) {}

  ngOnInit() {
    console.log('init');
    console.log(this.backgroundImage);
    this.el.nativeElement.style.backgroundImage = `url(${this.backgroundImage})`;
  }
}
