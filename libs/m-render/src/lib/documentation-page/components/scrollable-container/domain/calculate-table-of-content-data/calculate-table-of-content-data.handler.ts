import { CalculateTableOfContentDataRequest } from './calculate-table-of-content-data.request';
import { Injector } from '@angular/core';
import { DocumentationStore } from '../../../../services';
import {
  CalculateHashFromScrollPositionAndActivateTocHandler,
} from '../calculate-hash-from-scroll-position-and-activate-toc';
import { TableOfContentData } from '../table-of-content-data';
import { ITableOfContentItem } from '../i-table-of-content-item';

export class CalculateTableOfContentDataHandler {

  private readonly _provider: DocumentationStore;

  constructor(
    private _injector: Injector,
  ) {
    this._provider = _injector.get(DocumentationStore);
  }

  public handle(request: CalculateTableOfContentDataRequest): void {
    const flat: ITableOfContentItem[] = [];
    const tree: ITableOfContentItem[] = [];
    const stack: ITableOfContentItem[] = [];

    this._getNavigationSelectors(request.fMarkdownPage, this._provider.getToC().range).forEach((element) => {
      const tocItem = this._createItem(element);
      this._insertItemIntoTree(tocItem, tree, stack);
      flat.push(tocItem);
    });

    this._provider.tocData.set(new TableOfContentData(flat, tree));
    new CalculateHashFromScrollPositionAndActivateTocHandler(this._injector).handle();
  }

  private _getNavigationSelectors(fMarkdownPage: HTMLElement, tocRange?: {
    start: number,
    end: number
  }): HTMLElement[] {
    if (!tocRange || tocRange.start < 1 || tocRange.end > 6) {
      tocRange = { start: 1, end: 6 };
    }
    const selectors: string[] = [];
    for (let i = tocRange.start; i <= tocRange.end; i++) {
      selectors.push(`h${i}`);
    }
    return Array.from(fMarkdownPage.querySelectorAll(selectors.join(', ')));
  }

  private _createItem(element: HTMLElement): ITableOfContentItem {
    element.id = this._createNavigationId(element);
    return {
      hash: `#${element.id}`,
      title: element.innerHTML,
      element,
      children: [],
    };
  }

  private _createNavigationId(element: HTMLElement): string {
    return element.innerHTML.toLowerCase().replaceAll(' ', '-');
  }

  private _getLevel(element: HTMLElement): number {
    return parseInt(element.tagName.substring(1));
  }

  private _insertItemIntoTree(tocItem: ITableOfContentItem, tree: ITableOfContentItem[], stack: ITableOfContentItem[]): void {
    while (stack.length > 0 && this._getLevel(stack[stack.length - 1].element) >= this._getLevel(tocItem.element)) {
      stack.pop();
    }

    if (stack.length === 0) {
      tree.push(tocItem);
    } else {
      stack[stack.length - 1].children.push(tocItem);
    }

    stack.push(tocItem);
  }
}
