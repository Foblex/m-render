import { inject, Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import MarkdownIt from 'markdown-it';

import {
  EMarkdownContainerType,
  ParseAlerts,
  ParseAngularExampleWithCodeLinks,
  ParseGroupedCodeItems,
  ParsePreviewGroup,
  ParseSingleCodeItem,
} from './index';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { catchError, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { F_PREVIEW_NAVIGATION_PROVIDER } from './domain';

@Injectable()
export class MarkdownService {

  private readonly _markdown = new MarkdownIt({ html: true, linkify: true });
  private readonly _httpClient = inject(HttpClient);
  private readonly _domSanitizer = inject(DomSanitizer);
  private readonly _router = inject(Router);
  private readonly _provider = inject(F_PREVIEW_NAVIGATION_PROVIDER, {optional: true});

  constructor() {
    this._markdown
      .use((x) => new ParseSingleCodeItem().render(x))
      .use(...new ParseAlerts().render(EMarkdownContainerType.ALERT_TIP, this._markdown))
      .use(...new ParseAlerts().render(EMarkdownContainerType.ALERT_INFO, this._markdown))
      .use(...new ParseAlerts().render(EMarkdownContainerType.ALERT_WARNING, this._markdown))
      .use(...new ParseAlerts().render(EMarkdownContainerType.ALERT_DANGER, this._markdown))
      .use(...new ParseAlerts().render(EMarkdownContainerType.ALERT_DANGER, this._markdown))
      .use(...new ParseAlerts().render(EMarkdownContainerType.ALERT_SUCCESS, this._markdown))
      .use(...new ParseGroupedCodeItems().render())
      .use(...new ParsePreviewGroup(this._provider?.getNavigation() || []).render())
      .use(...new ParseAngularExampleWithCodeLinks().render());
  }

  public parseUrl(src: string): Observable<SafeHtml> {
    return this._httpClient.get(src, { responseType: 'text' }).pipe(take(1), catchError(() => of(''))).pipe(
      switchMap((text) => of(this._markdown.render(text))),
      switchMap((x) => of(this._cleanupEmptyParagraphs(x))),
      switchMap((x) => of(this._cleanupWasteParagraphFromExampleView(x))),
      switchMap((x) => of(this._cleanupWasteParagraphFromPreviewGroup(x))),
      switchMap((x) => of(this._normalizeLinks(x))),
      switchMap((x) => of(this._domSanitizer.bypassSecurityTrustHtml(x))),
    );
  }

  public parseText(value: string): Observable<SafeHtml> {
    return of(this._markdown.render(value)).pipe(
      switchMap((x) => of(this._cleanupEmptyParagraphs(x))),
      switchMap((x) => of(this._cleanupWasteParagraphFromExampleView(x))),
      switchMap((x) => of(this._cleanupWasteParagraphFromPreviewGroup(x))),
      switchMap((x) => of(this._normalizeLinks(x))),
      switchMap((x) => of(this._domSanitizer.bypassSecurityTrustHtml(x))),
    );
  }

  private _normalizeLinks(html: string): string {
    const currentPath = this._router.url;
    const prefix = currentPath.substring(0, currentPath.lastIndexOf('/'));

    return html.replace(/<a\s+href="([^"]*)"/g, (match, href) => {
      if (!this._isExternalLink(href)) {
        let newHref = href.substring(0);
        if (!href.startsWith('./')) {
          newHref = href.startsWith('/') ? `${prefix}${href}` : `${prefix}/${href}`;
        }
        return `<a href="${newHref}"`;
      }
      return match;
    });
  }

  private _isExternalLink(href: string): boolean {
    return href.startsWith('www') || href.startsWith('http');
  }

  private _cleanupEmptyParagraphs(html: string): string {
    return html.replace(/<p>\s*<\/p>/g, '');
  }

  private _cleanupWasteParagraphFromExampleView(html: string): string {
    return html.replace(/<div class="f-code-group-body">\s*<p>[^<]*<\/p>/g, '<div class="f-code-group-body">');
  }

  private _cleanupWasteParagraphFromPreviewGroup(html: string): string {
    return html.replace(/<p>(\[[^\]]+\](\s*\[[^\]]+\])*)<\/p>/g, '');
  }
}

