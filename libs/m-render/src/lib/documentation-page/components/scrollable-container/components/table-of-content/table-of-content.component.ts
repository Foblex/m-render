import {
  ChangeDetectionStrategy,
  Component, computed,
  ElementRef,
  HostListener,
  inject, Injector,
} from '@angular/core';
import { TableOfContentItemsComponent } from './table-of-content-items';
import { DocumentationStore } from '../../../../services';
import {
  ActivateTocByHashHandler,
  ScrollToElementInContainerHandler,
  ScrollToElementInContainerRequest,
} from '../../index';
import { ActivateTocByHashRequest } from '../../domain';
import { WINDOW } from '../../../../../common';

@Component({
  selector: 'aside[f-table-of-content]',
  styleUrls: ['./table-of-content.component.scss'],
  templateUrl: './table-of-content.component.html',
  standalone: true,
  imports: [TableOfContentItemsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableOfContentComponent {

  private readonly _elementRef = inject(ElementRef<HTMLElement>);
  private readonly _provider = inject(DocumentationStore);
  private readonly _injector = inject(Injector);
  private readonly _window = inject(WINDOW);

  protected readonly tocData = computed(() => {
    return this._provider.tocData();
  });

  protected readonly activeMarkerPosition = computed(() => {
    const index = this.tocData()?.flat.findIndex((x) => x.isActive) || 0;
    return this._getActiveMarkerPosition(index);
  });
  protected readonly title = inject(DocumentationStore).getToC().title;

  private _getActiveMarkerPosition(activeIndex: number): number {
    const itemHeight = parseInt(
      this._getComputedStyle(this._elementRef.nativeElement).getPropertyValue(
        '--on-page-navigation-item-height',
      ),
    );
    return (activeIndex + 1) * itemHeight + itemHeight / 4;
  }

  private _getComputedStyle(element: HTMLElement): CSSStyleDeclaration {
    return this._window.getComputedStyle(element);
  }

  @HostListener('click', ['$event'])
  protected _onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.tagName === 'A') {
      event.preventDefault();
      this._scrollTo(target.getAttribute('href')!);
    }
  }

  private _scrollTo(hash: string): void {
    new ActivateTocByHashHandler(this._injector).handle(new ActivateTocByHashRequest(hash));
    new ScrollToElementInContainerHandler(this._injector).handle(new ScrollToElementInContainerRequest(hash));
  }
}
