import { FExecutionRegister, IHandler } from '@foblex/mediator';
import { GetAbsoluteTopToContainerRequest } from './get-absolute-top-to-container.request';
import { inject, Injectable } from '@angular/core';
import {
  SCROLLABLE_CONTAINER,
} from '../../../index';

@Injectable()
@FExecutionRegister(GetAbsoluteTopToContainerRequest)
export class GetAbsoluteTopToContainerHandler implements IHandler<GetAbsoluteTopToContainerRequest, number> {

  private readonly _scrollableContainer = inject(SCROLLABLE_CONTAINER);

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
