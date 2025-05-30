import { AfterViewInit, Directive, ElementRef, inject, input, NgZone, OnDestroy, output } from '@angular/core';

@Directive({
  selector: '[overflowObserver]',
  standalone: true,
})
export class OverflowObserverDirective implements AfterViewInit, OnDestroy {
  public readonly element = input<HTMLElement>();
  public readonly overflowed = output<boolean>();

  private readonly _elementRef = inject(ElementRef<HTMLElement>);
  private readonly _ngZone = inject(NgZone);

  private _resizeObserver!: ResizeObserver;
  private _overflowed = false;

  public ngAfterViewInit(): void {
    if (!this.element()) {
      throw new Error('Element must be provided to OverflowObserverDirective');
    }
    this._ngZone.runOutsideAngular(() => {
      this._resizeObserver = new ResizeObserver(() => this._checkOverflow());
      this._resizeObserver.observe(this._elementRef.nativeElement);
      this._resizeObserver.observe(this.element()!);
    });
    setTimeout(() => this._checkOverflow());
  }

  private _checkOverflow(): void {
    const container = this._elementRef.nativeElement;
    const child = this.element();

    if (!child || !container) return;

    console.log(container.clientWidth, child.clientWidth, child.scrollWidth);

    const overflowed = child.scrollWidth >= container.clientWidth;

    if (overflowed !== this._overflowed) {
      this._overflowed = overflowed;
      this._ngZone.run(() => this.overflowed.emit(overflowed));
    }
  }

  public ngOnDestroy(): void {
    this._resizeObserver.disconnect();
  }
}
