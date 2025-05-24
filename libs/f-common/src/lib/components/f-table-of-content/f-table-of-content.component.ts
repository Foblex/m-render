import {
  ChangeDetectionStrategy,
  Component, computed,
  ElementRef,
  HostListener,
  inject,
} from '@angular/core';
import { FTableOfContentItemsComponent } from './f-table-of-content-items';
import { BrowserService } from '@foblex/platform';
import { F_TABLE_OF_CONTENT_PROVIDER } from './domain';
import { F_SCROLLABLE_CONTAINER } from '../f-scrollable-container';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'aside[f-table-of-content]',
  styleUrls: ['./f-table-of-content.component.scss'],
  templateUrl: './f-table-of-content.component.html',
  standalone: true,
  imports: [FTableOfContentItemsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FTableOfContentComponent {
  private readonly _elementRef = inject(ElementRef<HTMLElement>);
  private readonly _browser = inject(BrowserService);
  private readonly _scrollContainer = inject(F_SCROLLABLE_CONTAINER);

  protected tocData = toSignal(this._scrollContainer.onToc$.pipe(
    map((data) => {
      return new Proxy(data, {
        set(target, prop, value) {
          target[prop as keyof typeof target] = value;
          return true;
        },
      });
    }),
  ));
  protected activeMarkerPosition = computed(() => {
    const index = this.tocData()?.flat.findIndex((x) => x.isActive) || 0;
    return this._getActiveMarkerPosition(index);
  });
  protected title = inject(F_TABLE_OF_CONTENT_PROVIDER).getToC().title;

  private _getActiveMarkerPosition(activeIndex: number): number {
    const itemHeight = parseInt(
      this._getComputedStyle(this._elementRef.nativeElement).getPropertyValue(
        '--on-page-navigation-item-height',
      ),
    );
    return (activeIndex + 1) * itemHeight + itemHeight / 4;
  }

  private _getComputedStyle(element: HTMLElement): CSSStyleDeclaration {
    return this._browser.window.getComputedStyle(element);
  }

  @HostListener('click', ['$event'])
  protected _onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.tagName === 'A') {
      event.preventDefault();
      this._scrollContainer.scrollTo(target.getAttribute('href')!);
    }
  }
}
