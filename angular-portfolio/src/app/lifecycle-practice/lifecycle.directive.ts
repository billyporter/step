import { startWith } from 'rxjs/operators';
import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
    selector: '[appLifecycle]',
})
export class LifecycleDirective {


    constructor(private element: ElementRef) {}

    @Input('appLifecycle') color: string;

    @HostListener('mouseenter') onMouseEnter() {
      this.highlight(this.color || 'red');
    }

    private highlight(color: string) {
        this.element.nativeElement.style.backgroundColor = color;
    }
}
