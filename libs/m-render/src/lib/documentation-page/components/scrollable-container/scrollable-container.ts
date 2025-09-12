import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, forwardRef, inject, Injector, OnInit, } from '@angular/core';
import { IScrollableContainer, SCROLLABLE_CONTAINER } from './models';
import { debounceTime, fromEvent, startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  CalculateHashFromScrollPosition,
  TABLE_OF_CONTENT_MODULE_PROVIDERS,
  TableOfContent,
} from '../table-of-content';
import { Mediatr } from '../../../mediatr';
import { DYNAMIC_COMPONENTS_MODULE_PROVIDERS } from '../../../dynamic-components';
import { MarkdownService } from '../markdown-renderer';
import { filter } from 'rxjs/operators';
import { DOCUMENTATION_CONFIGURATION } from '../../domain';

@Component({
  selector: 'scrollable-container',
  templateUrl: './scrollable-container.html',
  styleUrls: ['./scrollable-container.scss'],
  standalone: true,
  providers: [
    {
      provide: SCROLLABLE_CONTAINER,
      useExisting: forwardRef(() => ScrollableContainer),
    },
    Mediatr,
    ...DYNAMIC_COMPONENTS_MODULE_PROVIDERS,
    ...TABLE_OF_CONTENT_MODULE_PROVIDERS,
    MarkdownService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TableOfContent,
  ],
})
export class ScrollableContainer implements OnInit, IScrollableContainer {
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _injector = inject(Injector);
  protected readonly tableOfContent = inject(DOCUMENTATION_CONFIGURATION).tableOfContent;

  public readonly htmlElement = inject(ElementRef<HTMLElement>).nativeElement;

  public ngOnInit(): void {
    fromEvent(this.htmlElement, 'scroll',{ passive: true })
      .pipe(
        debounceTime(100),
        startWith(null),
        filter((event: any) => {
          const ignoreProgrammatic = event?.target?._ignoreProgrammatic ?? false;
          this.htmlElement._ignoreProgrammatic = false;
          return !ignoreProgrammatic;
        }),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(() => this._calculateHashAndActivate());
  }

  private _calculateHashAndActivate(): void {
    this._injector.get(CalculateHashFromScrollPosition).handle();
  }
}

