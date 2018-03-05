import { Directive, Input, HostBinding } from '@angular/core';

@Directive({
  selector: '[appBackImg]'
})
export class BackImgDirective {
  @Input('appBackImg') set setImage(image) {
    if (image) {
      this.image = `url(${image})`;
    }
  };
  @HostBinding('style.backgroundImage') image = '';
}
