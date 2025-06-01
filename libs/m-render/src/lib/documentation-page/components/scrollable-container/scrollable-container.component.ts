import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  forwardRef,
  inject,
  Injector,
  OnInit,
} from '@angular/core';
import {
  CalculateHashFromScrollPositionAndActivateTocHandler,
  IScrollableContainer,
  SCROLLABLE_CONTAINER,
} from './domain';
import { debounceTime, fromEvent, startWith } from 'rxjs';
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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TableOfContentComponent,
  ],
})
export class ScrollableContainerComponent implements OnInit, IScrollableContainer {

  private readonly _destroyRef = inject(DestroyRef);
  private readonly _injector = inject(Injector);

  public readonly htmlElement = inject(ElementRef<HTMLElement>).nativeElement;

  public ngOnInit(): void {
    fromEvent(this.htmlElement, 'scroll')
      .pipe(
        debounceTime(100), startWith(null), takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(() => this._calculateHashAndActivate());
  }

  private _calculateHashAndActivate(): void {
    new CalculateHashFromScrollPositionAndActivateTocHandler(this._injector).handle();
  }
}

