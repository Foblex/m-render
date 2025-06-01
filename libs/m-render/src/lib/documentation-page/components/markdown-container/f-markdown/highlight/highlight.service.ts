import { inject, Injectable } from '@angular/core';
import { defer, from, Observable, of, switchMap } from 'rxjs';
import { BrowserService } from '@foblex/platform';
import { MarkCodeFocusedBlocksPostProcessor } from './mark-code-focused-blocks.post-processor';
import { BundledLanguage, BundledTheme, createHighlighter, HighlighterGeneric } from 'shiki';
import { UNIVERSAL_THEME } from './theme';
import { LANGUAGES } from '../components';
import { catchError, shareReplay } from 'rxjs/operators';

type Highlighter = HighlighterGeneric<BundledLanguage, BundledTheme>;

@Injectable({
  providedIn: 'root',
})
export class HighlightService {
  private readonly _browser = inject(BrowserService);
  private readonly _highlighter$: Observable<Highlighter> = defer(() =>
    from(createHighlighter({ themes: [UNIVERSAL_THEME], langs: LANGUAGES })),
  ).pipe(
    shareReplay(1),
  );

  public highlight(
    element: HTMLElement, lang: string, content: string,
  ): Observable<HTMLElement> {
    if (!this._browser.isBrowser()) {
      console.warn('[HighlightService] Skipping highlight on server.');
      return of(element);
    }
    return this._highlightCodeBlock(element, lang, content).pipe(
      switchMap((x) => this._postProcess(x)),
      catchError((err) => {
        console.error('[HighlightService] Failed to highlight:', err);
        return of(element);
      }),
    );
  }

  private _highlightCodeBlock(
    element: HTMLElement, lang: string, content: string,
  ): Observable<HTMLElement> {
    return this._highlighter$.pipe(
      switchMap((highlighter) => this._renderCode(element, highlighter, lang, content)),
    );
  }

  private _renderCode(
    element: HTMLElement, highlighter: Highlighter, lang: string, content: string,
  ): Observable<HTMLElement> {
    return new Observable<HTMLElement>((observer) => {
      const processedContent = this._preprocessFocus(content);
      element.innerHTML = highlighter.codeToHtml(processedContent, { lang, theme: 'universal', defaultColor: false });
      requestAnimationFrame(() => {
        observer.next(element);
        observer.complete();
      });
    });
  }

  private _preprocessFocus(code: string): string {
    return code.replace(/\|\:\|([\s\S]*?)\|\:\|/g, (_, p1) => `ƒƒƒ${p1}¢¢¢`);
  }

  private _postProcess(element: HTMLElement): Observable<HTMLElement> {
    return of(element).pipe(
      switchMap((x) => new MarkCodeFocusedBlocksPostProcessor(this._browser).handle(x)),
    );
  }
}
