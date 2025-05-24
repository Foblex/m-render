import { inject, Injectable } from '@angular/core';
import { Observable, of, Subscriber, switchMap } from 'rxjs';
import { ModifyPunctuationHighlightPostProcessor } from './modify-punctuation-highlight.post-processor';
import { BrowserService } from '@foblex/platform';
import { MarkCodeFocusedBlocksPostProcessor } from './mark-code-focused-blocks.post-processor';
import { ChangeCodeFocusedSyntaxPreProcessor } from './change-code-focused-syntax.pre-processor';

@Injectable({
  providedIn: 'root',
})
export class HighlightService {

  private _Prism: any;
  private readonly _browser = inject(BrowserService);

  public highlight(element: HTMLElement): Observable<any> {
    return this._browser.isBrowser() ? this._markNoneLanguage(element).pipe(
      switchMap((x) => new ChangeCodeFocusedSyntaxPreProcessor().handle(x)),
      switchMap((x) => this._highlightCodeWithPrism(x)),
      switchMap((x) => new ModifyPunctuationHighlightPostProcessor().handle(x)),
     // switchMap((x) => new SeparateCodeByLinesPostProcessor().handle(x)),
      switchMap((x) => new MarkCodeFocusedBlocksPostProcessor(this._browser).handle(x)),
    ) : of(element);
  }

  private _highlightCodeWithPrism(element: HTMLElement): Observable<HTMLElement> {
    return new Observable<HTMLElement>((observer) => {
      this._loadPrism().then((x) => this._highlightAllUnder(x, observer, element));
    });
  }

  private _highlightAllUnder(prism: any | undefined, observer: Subscriber<HTMLElement>, element: HTMLElement): void {
    try {
      prism?.highlightAllUnder(element);
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    } catch (e) { /* empty */ }
    observer.next(element);
    observer.complete();
  }

  private async _loadPrism(): Promise<any> {
    if (!this._Prism) {
      this._Prism = await import('prismjs');
      await Promise.all([
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        import('prismjs/components/prism-bash'),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        import('prismjs/components/prism-css'),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        import('prismjs/components/prism-scss'),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        import('prismjs/components/prism-typescript'),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        import('libs/f-highlight-code/src/lib/prism-angular'),
      ]);
    }
    return this._Prism;
  }

  private _markNoneLanguage(element: HTMLElement): Observable<HTMLElement> {
    element.querySelectorAll('pre code:not([class*="language-"])').forEach(
      (x) => {
        x.classList.add('language-none');
        x.innerHTML = x.textContent ?? '';
      },
    );
    return of(element);
  }
}
