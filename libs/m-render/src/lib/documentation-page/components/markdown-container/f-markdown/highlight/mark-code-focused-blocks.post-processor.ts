import { Observable, of } from 'rxjs';
import { IHandler } from '@foblex/mediator';
import { BrowserService } from '@foblex/platform';

export class MarkCodeFocusedBlocksPostProcessor implements IHandler<HTMLElement, Observable<HTMLElement>> {

  constructor(
    private _browser: BrowserService,
  ) {
  }

  public handle(element: HTMLElement): Observable<HTMLElement> {
    this._getCodeBlocks(element).forEach((block) => {
      block.innerHTML = this._replaceFocus(block.innerHTML);
      if (block.querySelector('.focused')) {
        this._applyOpacity(block.parentElement as HTMLElement);
      }
    });
    return of(element);
  }

  private _getCodeBlocks(element: HTMLElement): HTMLElement[] {
    return Array.from(element.querySelectorAll('pre code'));
  }

  private _replaceFocus(text: string): string {
    return text.replace(RULE.regex, RULE.replacer);
  }

  private _applyOpacity(element: HTMLElement) {
    if (!element.classList.contains('focused')) {
      element.style.color = this._createRgbaString(this._getElementColor(element), 0.5);
      element.childNodes.forEach((child) => {
        if (child.nodeType === Node.ELEMENT_NODE) {
          this._applyOpacity(child as HTMLElement);
        }
      });
    } else {
      element.style.color = this._createRgbaString(this._getElementColor(element), 1, true);
    }
  }

  private _getElementColor(element: HTMLElement): string {
    return this._browser.window.getComputedStyle(element).color;
  }

  private _createRgbaString(color: string, opacity: number, isRgb = false): string {
    const [ r, g, b, a ] = this._getRgbValues(color);
    const alpha = Number(a) || 1;
    return isRgb ? `rgb(${ r }, ${ g }, ${ b })` : `rgba(${ r }, ${ g }, ${ b }, ${ opacity * alpha })`;
  }

  private _getRgbValues(color: string): RegExpMatchArray {
    return color.match(/\d+/g)!;
  }
}

const RULE = {
  regex: /\|foc-\|(.*?)\|-foc\|/g,
  replacer: (match: any, p1: any) => {
    return `<focus class="focused"><span>${ p1 }</span></focus>`;
  },
};
