import { inject, Injectable, signal } from '@angular/core';
import {
  IDynamicComponentItem,
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
import { calculateMarkdownUrl } from '../utils/calculate-markdown-url';

@Injectable()
export class DocumentationStore
  implements ISocialLinksProvider, IHeaderConfigurationStore {
  private readonly _configuration = inject(DOCUMENTATION_CONFIGURATION);

  public readonly tocData = signal<TableOfContentData>(new TableOfContentData([], []));

  public getMarkdownUrl(markdown: string): string {
    return calculateMarkdownUrl(
      markdown,
      this._configuration.navigation,
      this._configuration.docsDir,
      this._configuration.notFoundMarkdown,
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
