import { inject, Injectable } from '@angular/core';
import { Observable, of, Subscriber, switchMap } from 'rxjs';
import { ModifyPunctuationHighlightPostProcessor } from './modify-punctuation-highlight.post-processor';
import { BrowserService } from '@foblex/platform';
import { MarkCodeFocusedBlocksPostProcessor } from './mark-code-focused-blocks.post-processor';
import { ChangeCodeFocusedSyntaxPreProcessor } from './change-code-focused-syntax.pre-processor';
import { BundledLanguage, BundledTheme, createHighlighter, HighlighterGeneric } from 'shiki';
import { UNIVERSAL_THEME } from './theme';
import { LANGUAGES } from '../components';

type Highlighter = HighlighterGeneric<BundledLanguage, BundledTheme>;

@Injectable({
  providedIn: 'root',
})
export class HighlightService {

  private _highlighter: Highlighter | undefined;
  private readonly _browser = inject(BrowserService);

  public highlight(element: HTMLElement, lang: string, content: string): Observable<HTMLElement> {
    return this._browser.isBrowser() ? this._markNoneLanguage(element).pipe(
      switchMap((x) => new ChangeCodeFocusedSyntaxPreProcessor().handle(x)),
      switchMap((x) => this._highlightCodeWithPrism(x, lang, content)),
      switchMap((x) => new ModifyPunctuationHighlightPostProcessor().handle(x)),
      switchMap((x) => new MarkCodeFocusedBlocksPostProcessor(this._browser).handle(x)),
    ) : of(element);
  }

  private _highlightCodeWithPrism(element: HTMLElement, lang: string, content: string): Observable<HTMLElement> {
    return new Observable<HTMLElement>((observer) => {
      this._loadHighlighter().then(() => this._highlight(observer, element, lang, content));
    });
  }

  private _highlight(
    observer: Subscriber<HTMLElement>,
    element: HTMLElement,
    lang: string,
    content: string,
  ): void {
    element.innerHTML = this._codeToHtml(content, lang);
    observer.next(element);
    observer.complete();
  }

  private _codeToHtml(code: string, language: string | undefined): string {
    return this._highlighter?.codeToHtml(code, {
      lang: language || 'text',
      theme: 'universal',
      defaultColor: false,
    }) || code;
  }

  private async _loadHighlighter(): Promise<Highlighter> {
    if (!this._highlighter) {
      this._highlighter = await createHighlighter({
        themes: [UNIVERSAL_THEME], langs: LANGUAGES,
      });
    }
    return this._highlighter;
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
