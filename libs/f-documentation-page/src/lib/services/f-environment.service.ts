import { inject, Injectable } from '@angular/core';
import {
  IDocsComponent,
  IDocsHeaderNavigationItem,
  ILogoTitleProvider,
  IMarkdownFooterNavigation,
  IMarkdownFooterNavigationProvider,
  INavigationGroup,
  INavigationProvider,
  INpmVersion,
  INpmVersionProvider,
  ISocialLink,
  ISocialLinksProvider,
  ITableOfContent,
  ITableOfContentProvider,
} from '@f-common';
import { ENVIRONMENT } from '../providers';
import { IExampleComponentService } from '@f-markdown';

@Injectable()
export class FEnvironmentService
  implements ISocialLinksProvider,
    IExampleComponentService<IDocsComponent>,
    INpmVersionProvider,
    INavigationProvider,
    ILogoTitleProvider,
    ITableOfContentProvider,
    IMarkdownFooterNavigationProvider {
  private readonly _environment = inject(ENVIRONMENT);

  public getMarkdownUrl(markdown: string): string {
    if (!markdown || !this._isMarkdownExist(markdown)) {
      return this._environment.notFoundMD;
    }
    let url = this._environment.docsDir + markdown;

    url = url.replace(/(\/en\/guides)+/g, '/en/guides');
    url = url.replace(/(\/en\/examples)+/g, '/en/examples');

    if (!url.endsWith('.md')) {
      url += '.md';
    }

    return url;
  }

  private _isMarkdownExist(id: string): boolean {
    return !!this._environment.navigation.find((x) =>
      x.items.some((i) => i.link === id),
    );
  }

  public getLogo(): string {
    return this._environment.logo;
  }

  public getTitle(): string {
    return this._environment.title;
  }

  public getHeaderNavigation(): IDocsHeaderNavigationItem[] {
    return this._environment.headerNavigation || [];
  }

  public getNpmVersion(): INpmVersion | undefined {
    return this._environment.version;
  }

  public getComponents(): IDocsComponent[] {
    return this._environment.components || [];
  }

  public getNavigation(): INavigationGroup[] {
    return this._environment.navigation;
  }

  public getFooterNavigation(): IMarkdownFooterNavigation {
    return this._environment.footerNavigation || {};
  }

  public getSocialLinks(): ISocialLink[] {
    return this._environment.socialLinks || [];
  }

  public getToC(): ITableOfContent {
    return (
      this._environment.toC || {
        title: 'In this article',
        range: { start: 2, end: 6 },
      }
    );
  }
}
