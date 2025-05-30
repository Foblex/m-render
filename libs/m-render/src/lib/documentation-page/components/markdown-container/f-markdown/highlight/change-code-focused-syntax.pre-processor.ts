import { Observable, of } from 'rxjs';
import { IHandler } from '@foblex/mediator';

export class ChangeCodeFocusedSyntaxPreProcessor
  implements IHandler<HTMLElement, Observable<HTMLElement>> {

  public handle(element: HTMLElement): Observable<HTMLElement> {
    this._getCodeBlocks(element).forEach((block) => {
      block.innerHTML = this._replaceFocus(block.innerHTML);
    });

    return of(element);
  }

  private _getCodeBlocks(element: HTMLElement): HTMLElement[] {
    return Array.from(element.querySelectorAll('pre code'));
  }

  private _replaceFocus(text: string): string {
    return text.replace(RULE.regex, RULE.replacer);
  }
}

const RULE = {
  regex: /\|:\|(.*?)\|:\|/g,
  replacer: (match: any, p1: any) => {
    return `|foc-|${p1}|-foc|`;
  },
};
