import { ComponentRef, inject, Injectable, signal } from '@angular/core';
import {
  IExampleComponent,
  IMarkdownFooterNavigation,
  INavigationGroup,
  ITableOfContent,
  TableOfContentData,
} from '../components';
import {
  IHeaderConfiguration,
  IHeaderConfigurationStore,
  IHeaderMenuLink,
  ISocialLink,
  ISocialLinksProvider,
} from '../../common';
import { DOCUMENTATION_CONFIGURATION } from '../domain';

@Injectable()
export class DocumentationStore
  implements ISocialLinksProvider, IHeaderConfigurationStore {
  private readonly _configuration = inject(DOCUMENTATION_CONFIGURATION);

  public readonly tocData = signal<TableOfContentData>(new TableOfContentData([], []));
  public readonly dComponents = signal<ComponentRef<any>[]>([]);

  public disposeDComponents(): void {
    this.dComponents().forEach((ref) => ref.destroy());
    this.dComponents.set([]);
  }

  public getMarkdownUrl(markdown: string): string {
    if (!markdown || !this._isMarkdownExist(markdown)) {
      return this._configuration.notFoundMarkdown;
    }
    let url = this._configuration.docsDir + markdown;

    url = url.replace(/(\/en\/guides)+/g, '/en/guides');
    url = url.replace(/(\/en\/examples)+/g, '/en/examples');

    if (!url.endsWith('.md')) {
      url += '.md';
    }

    return url;
  }

  private _isMarkdownExist(id: string): boolean {
    return !!this._configuration.navigation.find((x) =>
      x.items.some((i: { link: string; }) => i.link === id),
    );
  }

  public getLogo(): string {
    return this._configuration.logo;
  }

  public getTitle(): string {
    return this._configuration.title;
  }

  public getHeaderNavigation(): IHeaderMenuLink[] {
    return this._configuration.header?.navigation || [];
  }

  // public getNpmVersion(): IVersion | undefined {
  //   return this._configuration.version;
  // }

  public getComponents(): IExampleComponent[] {
    return this._configuration.components || [];
  }

  public getNavigation(): INavigationGroup[] {
    return this._configuration.navigation;
  }

  public getFooterNavigation(): IMarkdownFooterNavigation {
    return this._configuration.footer?.navigation || {};
  }

  public getSocialLinks(): ISocialLink[] {
    return this._configuration.header?.mediaLinks || [];
  }

  public getToC(): ITableOfContent {
    return (
      this._configuration.toC || {
        title: 'In this article',
        range: { start: 2, end: 6 },
      }
    );
  }

  // public getMetaData(): IMetaData | undefined {
  //   return this._configuration.meta;
  // }

  public getHeader(): IHeaderConfiguration | undefined {
    return this._configuration.header;
  }
}
