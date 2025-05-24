import { Observable, of } from 'rxjs';
import { IHandler } from '@foblex/mediator';
import { BrowserService } from '@foblex/platform';

export class MarkCodeFocusedBlocksPostProcessor implements IHandler<HTMLElement, Observable<HTMLElement>> {

  constructor(
    // eslint-disable-next-line @typescript-eslint/naming-convention
    private fBrowser: BrowserService,
  ) {
  }

  public handle(element: HTMLElement): Observable<HTMLElement> {
    this.getCodeBlocks(element).forEach((block) => {
      block.innerHTML = this.replaceFocus(block.innerHTML);
      if (block.querySelector('.focused')) {
        this.applyOpacity(block.parentElement as HTMLElement);
      }
    });
    return of(element);
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  private getCodeBlocks(element: HTMLElement): HTMLElement[] {
    return Array.from(element.querySelectorAll('pre code'));
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  private replaceFocus(text: string): string {
    return text.replace(RULE.regex, RULE.replacer);
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  private applyOpacity(element: HTMLElement) {
    if (!element.classList.contains('focused')) {
      element.style.color = this.createRgbaString(this.getElementColor(element), 0.5);
      element.childNodes.forEach((child) => {
        if (child.nodeType === Node.ELEMENT_NODE) {
          this.applyOpacity(child as HTMLElement);
        }
      });
    } else {
      element.style.color = this.createRgbaString(this.getElementColor(element), 1, true);
    }
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  private getElementColor(element: HTMLElement): string {
    return this.fBrowser.window.getComputedStyle(element).color;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  private createRgbaString(color: string, opacity: number, isRgb = false): string {
    const [ r, g, b, a ] = this.getRgbValues(color);
    const alpha = Number(a) || 1;
    return isRgb ? `rgb(${ r }, ${ g }, ${ b })` : `rgba(${ r }, ${ g }, ${ b }, ${ opacity * alpha })`;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  private getRgbValues(color: string): RegExpMatchArray {
    return color.match(/\d+/g)!;
  }
}

const RULE = {
  regex: /\|foc-\|(.*?)\|-foc\|/g,
  replacer: (match: any, p1: any) => {
    return `<focus class="focused">${ p1 }</focus>`;
  },
};
