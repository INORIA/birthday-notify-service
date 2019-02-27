import { Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BackImgDirective } from './back-img.directive';

@Component({
  template: `<div appBackImg="http://example.com/image.png"></div>`
})
class TestBackgroundComponent {}

describe('Directive: BackImgDirective', () => {
  let component: TestBackgroundComponent;
  let fixture: ComponentFixture<TestBackgroundComponent>;
  let divEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TestBackgroundComponent, BackImgDirective ]
    });

    fixture = TestBed.createComponent(TestBackgroundComponent);
    component = fixture.debugElement.componentInstance;
    divEl = fixture.debugElement.query(By.css('div'));
  });

  it('should create an instance', () => {
    fixture.detectChanges();
    expect(divEl.nativeElement.style.backgroundImage).toBe('url("http://example.com/image.png")');
  });
});
