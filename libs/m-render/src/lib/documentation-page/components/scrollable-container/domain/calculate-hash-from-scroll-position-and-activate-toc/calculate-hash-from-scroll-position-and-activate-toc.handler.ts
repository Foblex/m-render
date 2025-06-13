import { GetAbsoluteTopToContainerHandler, GetAbsoluteTopToContainerRequest } from '../get-absolute-top-to-container';
import { Injector } from '@angular/core';
import {
  ActivateTocByHashHandler, IScrollableContainer,
  SCROLLABLE_CONTAINER,
} from '../../../index';
import { ActivateTocByHashRequest } from '../activate-toc-by-hash';
import { DocumentationStore } from '../../../../services';
import { DOCUMENT_ELEMENT, WINDOW } from '@foblex/mr-common';

interface IHasTopItem {
  hash: string;
  top: number;
}

export class CalculateHashFromScrollPositionAndActivateTocHandler {

  private readonly _docElement: HTMLElement;
  private readonly _window: Window;
  private readonly _provider: DocumentationStore;
  private readonly _scrollableContainer: IScrollableContainer;

  constructor(
    private _injector: Injector,
  ) {
    this._docElement = _injector.get(DOCUMENT_ELEMENT);
    this._window = _injector.get(WINDOW);
    this._provider = _injector.get(DocumentationStore);
    this._scrollableContainer = _injector.get(SCROLLABLE_CONTAINER);
  }

  public handle(): void {
    let result: string | undefined;
    const containerScrollTop = this._getContainerScrollTop();

    const elementsWithTopPosition = this._calculateElementsTopPositions();

    if (elementsWithTopPosition.length) {
      if (this._isScrollAtBottom(containerScrollTop)) {
        result = elementsWithTopPosition[elementsWithTopPosition.length - 1].hash;
      } else {
        result = this._findTargetHashByPosition(containerScrollTop, elementsWithTopPosition);
      }
    }
    new ActivateTocByHashHandler(this._injector).handle(new ActivateTocByHashRequest(result));
  }

  private _getContainerScrollTop(): number {
    return this._scrollableContainer.htmlElement.scrollTop + this._getHeaderHeight();
  }

  private _getHeaderHeight(): number {
    return parseInt(this._window
      .getComputedStyle(this._docElement)
      .getPropertyValue('--header-height'), 10,
    );
  }

  private _calculateElementsTopPositions(): IHasTopItem[] {
    return this._provider.tocData().flat.map((x) => {
      return {
        hash: x.hash,
        top: this._getAbsoluteTopToContainer(x.element),
      };
    }).filter((x) => !Number.isNaN(x.top));
  }

  private _getAbsoluteTopToContainer(element: HTMLElement): number {
    return new GetAbsoluteTopToContainerHandler(this._injector).handle(
      new GetAbsoluteTopToContainerRequest(element),
    )
  }

  private _isScrollAtBottom(containerScrollTop: number): boolean {
    return Math.abs(containerScrollTop - this._getHeaderHeight() + this._scrollableContainer.htmlElement.clientHeight - this._scrollableContainer.htmlElement.scrollHeight) < 1;
  }

  private _findTargetHashByPosition(containerScrollTop: number, elementsWithTopPosition: IHasTopItem[]): string {
    let result: string = elementsWithTopPosition[0].hash;
    for (const { hash, top } of elementsWithTopPosition) {
      if (top > containerScrollTop) break;
      result = hash;
    }
    return result;
  }
}
