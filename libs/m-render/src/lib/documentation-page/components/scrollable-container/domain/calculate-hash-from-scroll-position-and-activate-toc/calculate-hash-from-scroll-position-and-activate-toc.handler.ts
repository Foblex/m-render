import { FExecutionRegister, FMediator, IExecution } from '@foblex/mediator';
import { CalculateHashFromScrollPositionAndActivateTocRequest } from './calculate-hash-from-scroll-position-and-activate-toc.request';
import { GetAbsoluteTopToContainerRequest } from '../get-absolute-top-to-container';
import { BrowserService } from '@foblex/platform';
import { inject, Injectable } from '@angular/core';
import {
  SCROLLABLE_CONTAINER,
} from '../../../index';
import { ActivateTocByHashRequest } from '../activate-toc-by-hash';
import { DocumentationStore } from '../../../../services';

interface IHasTopItem {
  hash: string;
  top: number;
}

@Injectable()
@FExecutionRegister(CalculateHashFromScrollPositionAndActivateTocRequest)
export class CalculateHashFromScrollPositionAndActivateTocHandler
  implements IExecution<CalculateHashFromScrollPositionAndActivateTocRequest, void> {

  private readonly _browser = inject(BrowserService);
  private readonly _mediator = inject(FMediator);
  private readonly _provider = inject(DocumentationStore);
  private readonly _scrollableContainer = inject(SCROLLABLE_CONTAINER);

  public handle(): void {
    let result: string | undefined;
    const containerScrollTop = this._getContainerScrollTop();

    const elementsWithTopPosition = this._calculateElementsTopPositions();

    if (elementsWithTopPosition.length) {
      if (this._isScrollAtBottom(containerScrollTop)) {
        result = elementsWithTopPosition[ elementsWithTopPosition.length - 1 ].hash;
      } else {
        result = this._findTargetHashByPosition(containerScrollTop, elementsWithTopPosition);
      }
    }
    this._mediator.execute(new ActivateTocByHashRequest(result));
  }

  private _getContainerScrollTop(): number {
    return this._scrollableContainer.htmlElement.scrollTop + this._getHeaderHeight();
  }

  private _getHeaderHeight(): number {
    return parseInt(this._browser.window
      .getComputedStyle(this._browser.document.documentElement)
      .getPropertyValue('--header-height'), 10,
    );
  }

  private _calculateElementsTopPositions(): IHasTopItem[] {
    return this._provider.tocData().flat.map((x) => {
      return {
        hash: x.hash,
        top: this._getAbsoluteTopToContainer(x.element),
      }
    }).filter((x) => !Number.isNaN(x.top));
  }

  private _getAbsoluteTopToContainer(element: HTMLElement): number {
    return this._mediator.execute(
      new GetAbsoluteTopToContainerRequest(element),
    );
  }

  private _isScrollAtBottom(containerScrollTop: number): boolean {
    return Math.abs(containerScrollTop - this._getHeaderHeight() + this._scrollableContainer.htmlElement.clientHeight - this._scrollableContainer.htmlElement.scrollHeight) < 1;
  }

  private _findTargetHashByPosition(containerScrollTop: number, elementsWithTopPosition: IHasTopItem[]): string {
    let result: string = elementsWithTopPosition[ 0 ].hash;
    for (const { hash, top } of elementsWithTopPosition) {
      if (top > containerScrollTop) break;
      result = hash;
    }
    return result;
  }
}
