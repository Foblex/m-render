import { InjectionToken } from '@angular/core';
import { IMarkdownFooterNavigation } from './i-markdown-footer-navigation';
import { INavigationGroup } from '@f-common';

export interface IMarkdownFooterNavigationProvider {

  getNavigation(): INavigationGroup[];

  getFooterNavigation(): IMarkdownFooterNavigation;
}

export const F_MARKDOWN_FOOTER_NAVIGATION = new InjectionToken<IMarkdownFooterNavigationProvider>('F_MARKDOWN_FOOTER_NAVIGATION');
