import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  inject,
  OnDestroy,
} from '@angular/core';
import {
  CalculateHashFromScrollPositionHandler,
  CalculateHashFromScrollPositionRequest,
  F_SCROLLABLE_CONTAINER,
  IScrollableContainerProvider,
  ScrollToElementInContainer,
} from './domain';
import { debounceTime, fromEvent, map, Observable, startWith, Subject } from 'rxjs';
import { BrowserService } from '@foblex/platform';
import {
  F_TABLE_OF_CONTENT_PROVIDER,
  GetTableOfContentDataHandler,
  GetTableOfContentDataRequest,
  TableOfContentData,
} from '../f-table-of-content';

@Component({
  selector: 'f-scrollable-container',
  templateUrl: './f-scrollable-container.component.html',
  styleUrls: ['./f-scrollable-container.component.scss'],
  providers: [
    {
      provide: F_SCROLLABLE_CONTAINER,
      useExisting: forwardRef(() => FScrollableContainerComponent),
    },
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FScrollableContainerComponent
  implements OnDestroy, IScrollableContainerProvider {
  private readonly _elementRef = inject(ElementRef<HTMLElement>);
  private readonly _browser = inject(BrowserService);
  private readonly _onTocChanged$ = new Subject<void>();
  private readonly _tocProvider = inject(F_TABLE_OF_CONTENT_PROVIDER);

  private _tocData = new TableOfContentData([], []);

  public get onToc$(): Observable<TableOfContentData> {
    return this._onTocChanged$.asObservable().pipe(map(() => this._tocData));
  }

  private _onScroll$ = fromEvent(this._elementRef.nativeElement, 'scroll')
    .pipe(debounceTime(100), startWith(null))
    .subscribe(() => this._calculateHashAndActivate());

  public scrollTo(hash: string): void {
    this._activateHash(hash);
    new ScrollToElementInContainer(this._elementRef.nativeElement).handle(hash);
  }

  public setOnPageNavigation(fMarkdownPage: HTMLElement): void {
    this._tocData = new GetTableOfContentDataHandler().handle(
      new GetTableOfContentDataRequest(
        fMarkdownPage,
        this._tocProvider.getToC().range,
      ),
    );
    this._calculateHashAndActivate();
  }

  private _calculateHashAndActivate(): void {
    this._activateHash(this._calculateHashFromScrollPosition());
  }

  private _calculateHashFromScrollPosition(): string | undefined {
    return new CalculateHashFromScrollPositionHandler(
      this._elementRef.nativeElement,
      this._browser,
    ).handle(new CalculateHashFromScrollPositionRequest(this._tocData.flat));
  }

  private _activateHash(hash: string | undefined): void {
    this._tocData.flat.forEach((x) => (x.isActive = x.hash === hash));
    this._onTocChanged$.next();
  }

  public ngOnDestroy(): void {
    this._onScroll$.unsubscribe();
  }
}
