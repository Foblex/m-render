import { ScrollToElementInContainerRequest } from './scroll-to-element-in-container.request';
import { Injector } from '@angular/core';
import { IScrollableContainer, SCROLLABLE_CONTAINER } from '../../../index';

export class ScrollToElementInContainerHandler {

  private readonly _scrollableContainer: IScrollableContainer;

  constructor(
    _injector: Injector,
  ) {
    this._scrollableContainer = _injector.get(SCROLLABLE_CONTAINER);
  }

  public handle(payload: ScrollToElementInContainerRequest): void {
    this._scrollableContainer.htmlElement.scrollTo({
      top: this._getScrollTo(this._getScrollToElement(payload.hash)) - 64,
      behavior: 'smooth',
    });
  }

  private _getScrollToElement(hash: string): HTMLElement {
    const element = this._scrollableContainer.htmlElement.querySelector(hash)! as HTMLElement;
    if (!element) {
      throw new Error(`Element ${ hash } not found`);
    }
    return element;
  }

  private _getScrollTo(element: HTMLElement): number {
    return this._isFirstElementInContainer(element) ? 0 : this._calculateScrollTo(element);
  }

  private _isFirstElementInContainer(element: HTMLElement): boolean {
    return element.parentElement!.children[ 0 ] === element;
  }

  private _calculateScrollTo(element: HTMLElement): number {
    return this._getElementTop(element) - this._getContainerTop() + this._scrollableContainer.htmlElement.scrollTop;
  }

  private _getElementTop(element: HTMLElement): number {
    return element.getBoundingClientRect().top;
  }

  private _getContainerTop(): number {
    return this._scrollableContainer.htmlElement.getBoundingClientRect().top;
  }
}
