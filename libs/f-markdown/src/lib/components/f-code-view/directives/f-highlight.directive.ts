import { DestroyRef, Directive, ElementRef, inject, input, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HighlightService } from '@f-highlight-code';

@Directive({
  selector: 'pre[fHighlight]',
  standalone: true,
})
export class FHighlightDirective implements OnInit {

  private readonly _highlightService = inject(HighlightService);
  private readonly _elementRef = inject(ElementRef);
  private readonly _destroyRef = inject(DestroyRef);

  public content = input<string>();

  public ngOnInit() {
    queueMicrotask(() => {
      this._highlightService.highlight(this._elementRef.nativeElement)
        .pipe(
          take(1), takeUntilDestroyed(this._destroyRef),
        ).subscribe();
    })
  }
}
