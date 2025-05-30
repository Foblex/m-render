import {
  ChangeDetectionStrategy,
  Component, computed,
  ElementRef,
  HostListener,
  inject,
} from '@angular/core';
import { TableOfContentItemsComponent } from './table-of-content-items';
import { BrowserService } from '@foblex/platform';
import { DocumentationStore } from '../../../../services';
import { ScrollToElementInContainerRequest } from '../../index';
import { ActivateTocByHashRequest } from '../../domain/activate-toc-by-hash';
import { FMediator } from '@foblex/mediator';

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
  private readonly _browser = inject(BrowserService);
  private readonly _provider = inject(DocumentationStore);
  private readonly _mediator = inject(FMediator);

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
    return this._browser.window.getComputedStyle(element);
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
    this._mediator.execute<void>(new ActivateTocByHashRequest(hash));
    this._mediator.execute<void>(new ScrollToElementInContainerRequest(hash));
  }
}
