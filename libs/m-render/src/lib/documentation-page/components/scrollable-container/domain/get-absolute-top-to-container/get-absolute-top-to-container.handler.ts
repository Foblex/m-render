import { GetAbsoluteTopToContainerRequest } from './get-absolute-top-to-container.request';
import { Injector } from '@angular/core';
import {
  IScrollableContainer,
  SCROLLABLE_CONTAINER,
} from '../../../index';

export class GetAbsoluteTopToContainerHandler {

  private readonly _scrollableContainer: IScrollableContainer;

  constructor(
    _injector: Injector,
  ) {
    this._scrollableContainer = _injector.get(SCROLLABLE_CONTAINER);
  }

  public handle(request: GetAbsoluteTopToContainerRequest): number {
    let element = request.element;
    let result = 0;

    while (element !== this._scrollableContainer.htmlElement) {
      if (!element) return NaN;
      result += element.offsetTop;
      element = element.offsetParent as HTMLElement;
    }

    return result;
  }
}
