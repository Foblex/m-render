import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, forwardRef, inject, OnInit } from '@angular/core';
import {
  CalculateHashFromScrollPositionAndActivateTocRequest,
  IScrollableContainer,
  SCROLLABLE_CONTAINER,
  SCROLLABLE_CONTAINER_FEATURES,
} from './domain';
import { debounceTime, fromEvent, startWith } from 'rxjs';
import { FMediator } from '@foblex/mediator';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TableOfContentComponent } from './components';

@Component({
  selector: 'f-scrollable-container',
  templateUrl: './scrollable-container.component.html',
  styleUrls: ['./scrollable-container.component.scss'],
  standalone: true,
  providers: [
    {
      provide: SCROLLABLE_CONTAINER,
      useExisting: forwardRef(() => ScrollableContainerComponent),
    },
    FMediator,
    ...SCROLLABLE_CONTAINER_FEATURES,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TableOfContentComponent,
  ],
})
export class ScrollableContainerComponent implements OnInit, IScrollableContainer {

  private readonly _mediator = inject(FMediator);
  private readonly _destroyRef = inject(DestroyRef);

  public readonly htmlElement = inject(ElementRef<HTMLElement>).nativeElement;

  public ngOnInit(): void {
    fromEvent(this.htmlElement, 'scroll')
      .pipe(
        debounceTime(100), startWith(null), takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(() => this._calculateHashAndActivate());
  }

  private _calculateHashAndActivate(): void {
    this._mediator.send<string | undefined>(
      new CalculateHashFromScrollPositionAndActivateTocRequest(),
    );
  }
}

